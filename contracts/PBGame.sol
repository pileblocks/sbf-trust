pragma ton-solidity >= 0.47.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./abstract/GameEvents.sol";
import "./interfaces/IGameHost.sol";
import "./interfaces/IFarmingWallet.sol";
import "./structures/PBStructs.sol";

import "./FarmingWallet.sol";
import "./PBConstants.sol";


contract PBGame is PBConstants, GameEvents {

    TvmCell static farmingCode;

    // Game params
    uint32 gameId;
    uint128 gamePot;
    uint64 gameStartTime;
    uint8 status;
    uint8 errorRate;
    address gameHost;
    uint64 gameCompleted;
    uint128 initialBalance;

    modifier onlyHost() {
        require(msg.sender == gameHost, CALLER_NOT_GAME_HOST);
        _;
    }

    constructor (uint64 _gameStartTime, uint8 _errorRate) public {

        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), FAILED_FETCH_GAME_ID);
        (gameId, gameHost) = optSalt
            .get()
            .toSlice()
            .decode(uint32, address);

        require(msg.sender == gameHost, INVALID_GAME_HOST);
        gameStartTime = _gameStartTime;
        gamePot = msg.value;
        initialBalance = msg.value;
        status = STATUS_GAME_ACTIVE;
        errorRate = _errorRate;

    }

    /*
        @notice A game host approves one of the games, and then players can start interacting with it.
        @param newStatus - new status, can be among the STATUS_GAME_* constants
    */
    function setGameStatus(uint8 newStatus) external internalMsg onlyHost {
        status = newStatus;
    }

    function deployFarmingWallet(address affiliateAddress) external view {
        require(msg.value >= MIN_WALLET_BALANCE * 5, TOKEN_BALANCE_LOW);

        if (now < gameStartTime || status != STATUS_GAME_ACTIVE) {
            msg.sender.transfer({value: 0, flag: 64});
            return;
        }

        TvmCell initData = tvm.buildStateInit({
            contr: FarmingWallet,
            varInit: {
                owner: msg.sender
            },
            pubkey: 0,
            code: getFarmingCode()
        });
        emit OperationCompleted("PlayerJoined", msg.sender, status, now, 0);
        new FarmingWallet {
            stateInit: initData,
            value: 0,
            flag: 64
        }(affiliateAddress);
    }

    function tokenAdded(address ownerAddress, uint128 amount) external internalMsg {
        require(msg.sender == getFarmingAddress(ownerAddress), WALLET_DOES_NOT_MATCH_OWNER);

        if (now < gameStartTime || now > gameStartTime + 30 * 60 || status != STATUS_GAME_ACTIVE) {
            msg.sender.transfer({value: 0, flag: 64});
            return;
        }

        gamePot += amount;
        emit OperationCompleted("TokensAdded", ownerAddress, status, now, amount);
        if (isShitHappened()) {
            completeGameWithError();
        }
    }

    function checkStatus(uint128 claimAmount) external view responsible returns (uint8) {
        if (now > gameStartTime + 30 * 60 || address(this).balance < claimAmount) {
            return{value: 0, flag: 64} STATUS_GAME_COMPLETED;
        }
        return{value: 0, flag: 64} status;
    }

    function tokenRemoved(address ownerAddress, uint128 amount) external internalMsg {
        require(msg.sender == getFarmingAddress(ownerAddress), WALLET_DOES_NOT_MATCH_OWNER);
        require(status == STATUS_GAME_ACTIVE, WRONG_GAME_STATUS);
        require(now <= gameStartTime + 30 * 60, GAME_COMPLETED);
        tvm.accept();
        if (isShitHappened()) {
            completeGameWithError();
        }
        else if (amount >= gamePot) {
            completeGameWithError();
        } else {
            gamePot -= amount;
            emit OperationCompleted("TokensRemoved", ownerAddress, status, now, amount);
            ownerAddress.transfer({value: amount});
        }
    }

    function completeGameWithError() private {
        status = STATUS_GAME_COMPLETED;
        gameCompleted = now;
        emit OperationCompleted("GameCompletedBug", address(this), status, now, gamePot);
        IGameHost(gameHost).startNewGame{value: 0.1 ton}();
        drain();
    }

    function completeGame() private {
        status = STATUS_GAME_COMPLETED;
        gameCompleted = now;
        IGameHost(gameHost).startNewGame{value: 0.1 ton}();
        drain();
        emit OperationCompleted("GameCompleted", address(this), status, now, gamePot);
    }

    function completeGameByTime() external internalMsg {
        require(now >= gameStartTime + 30 * 60);
        require(status == STATUS_GAME_ACTIVE, WRONG_GAME_STATUS);
        require(msg.value >= MIN_WALLET_BALANCE * 2, TOKEN_BALANCE_LOW);
        tvm.accept();
        status = STATUS_GAME_COMPLETED;
        gameCompleted = now;
        IGameHost(gameHost).startNewGame{value: 0.1 ton}();
        msg.sender.transfer({value: 1 ton});
        drain();
        emit OperationCompleted("GameCompleted", address(this), status, now, gamePot);
    }

    function isShitHappened() private view returns (bool){
        rnd.shuffle();
        uint8 chance = rnd.next(100);
        return chance <= errorRate;
    }

//
//  DRAIN functions
//

    /*
        @notice A game drains itself on completion
    */
    function drain() internal view {
        tvm.rawReserve(0.1 ton, 0);
        gameHost.transfer({ value: 0, flag: 128 });
    }

    /*
        @notice Force a game to drain itself
    */
    function drainByHost() onlyHost external view {
        tvm.rawReserve(0.1 ton, 0);
        gameHost.transfer({ value: 0, flag: 128 });
    }

//
//        Service functions
//


    /*
        @notice Derive farming wallet contract address from owner credentials
        @param owner_address_ Address of a wallet which owns the token wallet
    */
    function getFarmingAddress(address walletOwner) public view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: FarmingWallet,
            varInit: {
                owner: walletOwner
            },
            pubkey: 0,
            code: getFarmingCode()
        });

        return address(tvm.hash(stateInit));
    }

    function getFarmingCode() private view returns (TvmCell) {
        TvmBuilder salt;
        salt.store(address(this));
        return tvm.setCodeSalt(farmingCode, salt.toCell());
    }

    function getFarmingHash() external view returns (string _farmingHash) {
        TvmBuilder salt;
        salt.store(address(this));
        _farmingHash = format("{:x}", tvm.hash(tvm.setCodeSalt(farmingCode, salt.toCell())));
    }

    function getInfo() public view returns (GameInfo) {
        return GameInfo(
            gameStartTime,
            gameId,
            gameHost,
            status,
            gamePot,
            errorRate,
            gameCompleted,
            initialBalance
        );
    }

}
