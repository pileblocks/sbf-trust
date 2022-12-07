pragma ton-solidity >= 0.47.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/IPBGame.sol";
import "./PBGame.sol";
import "./GameIndex.sol";

contract GameHost is PBConstants {

    uint64 static _randomNonce;
    uint32 public currentGameId;
    uint128 public gamePot;
    uint8 public errorRate;
    TvmCell public indexCode;
    TvmCell gameCode;
    TvmCell farmingCode;

    modifier onlyOwner() {
        require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        _;
    }

    constructor (
                TvmCell _indexCode,
                TvmCell _gameCode,
                TvmCell _farmingCode
                )
    public
    {
		require(tvm.pubkey() != 0, PUBLIC_KEY_MISSING);
		require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        tvm.accept();
        indexCode = _indexCode;
        gameCode = _gameCode;
        farmingCode = _farmingCode;
        currentGameId = 1;
        gamePot = 50 ton;
        errorRate = 1;
    }

    /*
        @notice Provides the code to deploy a game with a particular ID
        @param gameId - ID of a game one wants to deploy
    */
    function getGameCode(uint32 gameId) public view returns (TvmCell) {
        TvmBuilder salt;
        //We Salt also with the game host address to distinguish between games of different hosts
        salt.store(gameId, address(this));
        return tvm.setCodeSalt(gameCode, salt.toCell());
    }

    function getIndexCode() private view returns (TvmCell) {
        TvmBuilder salt;
        salt.store(address(this));
        return tvm.setCodeSalt(indexCode, salt.toCell());
    }

    /*
        @notice Provides the code hash of a particular game code
        @dev Client apps should filter the contracts by this code and check game address
        @dev to find the upcoming games
        @param gameId - ID of a game one wants to deploy
    */
    function getGameHash(uint32 gameId) external view returns (uint256) {
        TvmBuilder salt;
        salt.store(gameId, address(this));
        return tvm.hash(tvm.setCodeSalt(gameCode, salt.toCell()));
    }

    /*
        @notice Updates the game code without changing the game host address.
        @dev Use this to launch modified games under the same host.
        @param _gameCode - the new game code
    */
    function setGameCode(TvmCell _gameCode) external externalMsg onlyOwner {
        tvm.accept();
        gameCode = _gameCode;
    }

    function setGameStatus(address gameAddress, uint8 newStatus) external pure externalMsg onlyOwner {
        tvm.accept();
        IPBGame(gameAddress).setGameStatus{value: 0.1 ton}(newStatus);
    }

    function setGamePot(uint128 newGamePot) external externalMsg onlyOwner {
        tvm.accept();
        gamePot = newGamePot;
    }

    function setErrorRate(uint8 _errorRate) external externalMsg onlyOwner {
        tvm.accept();
        errorRate = _errorRate;
    }

    function setFarmingCode(TvmCell _farmingCode) external externalMsg onlyOwner {
        tvm.accept();
        farmingCode = _farmingCode;
    }

    function deployGame(uint64 _gameStartTime, uint8 _errorRate) private view returns (address) {

        TvmCell stateInit = tvm.buildStateInit({
            contr: PBGame,
            varInit: {
                farmingCode: farmingCode
            },
            pubkey: 0,
            code: getGameCode(currentGameId)
        });
        address game = new PBGame{
            stateInit: stateInit,
            value: gamePot
        }(_gameStartTime, _errorRate);
        tvm.log(format("New game: {}", game));
        return game;
    }

    function startNewGame() external {
        require(getGameAddress() == msg.sender, WRONG_GAME_ADDRESS);
        tvm.accept();
        address gameAddress = deployGame(now + 5 * 60, errorRate);
        deployIndex(currentGameId, gameAddress);
        currentGameId += 1;
    }

    function forceStartNewGame(uint64 startTime) public onlyOwner {
        tvm.accept();
        if (startTime == 0) {
            startTime = now;
        }
        address gameAddress = deployGame(now, errorRate);
        deployIndex(currentGameId, gameAddress);
        currentGameId += 1;
    }

    function deployIndex(uint32 _gameId, address gameAddress) private view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: GameIndex,
            varInit: {
                gameId: _gameId
            },
            pubkey: tvm.pubkey(),
            code: getIndexCode()
        });
        address index = new GameIndex{
            stateInit: stateInit,
            value: 0.2 ton,
            flag: 1
        }(gameAddress);
        tvm.log(format("New index: {}", index));
        return index;
    }

    function getGameAddress() public view returns (address _gameAddress) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: PBGame,
            varInit: {
                farmingCode: farmingCode
            },
            pubkey: 0,
            code: getGameCode(currentGameId - 1)
        });

        _gameAddress = address(tvm.hash(stateInit));
    }

    function getIndexAddress(uint32 _gameId) external view returns (address _indexAddress) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: GameIndex,
            varInit: {
                gameId: _gameId
            },
            pubkey: tvm.pubkey(),
            code: getIndexCode()
        });
        _indexAddress = address(tvm.hash(stateInit));
    }


//
//  DRAIN functions
//

    /*
        @notice Returns the host's EVERs to receiver
    */
    function drain(address receiver) onlyOwner external view {
        tvm.accept();
        tvm.rawReserve(0.1 ton, 0);
        receiver.transfer({ value: 0, flag: 128 });
    }

    /*
        @notice Returns a game's EVERs to the host
    */
    function drainGame(address gameAddress) onlyOwner external pure {
        tvm.accept();
        IPBGame(gameAddress).drainByHost{value: 0.1 ton}();
    }

}
