pragma ton-solidity >= 0.57.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./PBConstants.sol";
import "./interfaces/IPBGame.sol";
import "./structures/PBStructs.sol";

contract FarmingWallet is PBConstants {

    address static owner;
    address public game;

    uint128 public farmingSpeed;

    // Farming
    uint128 public _balance;
    uint128 public farmedTokens;
    uint64 public farmChangeTime;
    address public affiliateAddress;
    uint128 totalClaimed;

    modifier onlyOwner() {
        require(msg.sender == owner, WALLET_DOES_NOT_MATCH_OWNER);
        _;
    }

    constructor (address _affiliateAddress) public {
        farmingSpeed = 10;
        farmChangeTime = 0;
        farmedTokens = 0;
        _balance = 0;
        affiliateAddress = _affiliateAddress;
        tvm.rawReserve(MIN_WALLET_BALANCE, 0);

        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), WRONG_GAME_ADDRESS);
        game = optSalt
            .get()
            .toSlice()
            .decode(address);

        require(msg.sender == game, WRONG_GAME_ADDRESS);
        owner.transfer({ value: 0, flag: 128 });
    }

    function addTokens() external onlyOwner {
        require(msg.value >= MIN_WALLET_BALANCE * 2, TOKEN_BALANCE_LOW);
        notifyBalanceChange();
        _balance += msg.value;
        tvm.rawReserve(MIN_WALLET_BALANCE, 0);

        if (affiliateAddress == game || affiliateAddress == owner) {
            IPBGame(game).tokenAdded{value: 0, flag: 128}(owner, msg.value);
        } else {
            uint128 affiliateAmount = msg.value * 15 / 100;
            affiliateAddress.transfer({value: affiliateAmount});
            IPBGame(game).tokenAdded{value: 0, flag: 128}(owner, msg.value - affiliateAmount);
        }

    }

    function claimTokens() external view onlyOwner {
        require(msg.value >= MIN_WALLET_BALANCE * 2, TOKEN_BALANCE_LOW);
        tvm.rawReserve(MIN_WALLET_BALANCE, 0);
        IPBGame(game).checkStatus{callback: FarmingWallet.onCheckStatus, flag: 128}(owner, showFarmedTokens(now));
    }

    function onCheckStatus(uint8 gameStatus) external {
        require(msg.sender == game, WRONG_GAME_ADDRESS);
        tvm.rawReserve(MIN_WALLET_BALANCE, 0);
        if (gameStatus == STATUS_GAME_ACTIVE) {
            notifyBalanceChange();
            uint128 existingFarmedTokens = farmedTokens;
            farmedTokens = 0;
            totalClaimed += existingFarmedTokens;
            IPBGame(game).tokenRemoved{value: 0, flag: 128}(owner, existingFarmedTokens);
        }
        else {
            owner.transfer({value: 0, flag: 128});
        }
    }

    function raiseFarmingSpeed() external onlyOwner {
        require(msg.value == 10 ton, INVALID_TOKENS_PER_PUT);
        farmingSpeed += 1;
        tvm.rawReserve(MIN_WALLET_BALANCE, 0);
        IPBGame(game).tokenAdded{value: 0, flag: 128}(owner, msg.value);
    }

    function drain() external view onlyOwner {
        tvm.rawReserve(0.1 ton, 0);
        owner.transfer({ value: 0, flag: 128 });
    }

    //
    // Farming functions
    //

    function notifyBalanceChange() private {
        farmedTokens = showFarmedTokens(now);
        farmChangeTime = now;
    }

    function calcFarming(uint64 time) public view returns (uint128) {
        if (_balance == 0) {
            return 0;
        }
        //
        //    10% / min
        //
        return  time * farmingSpeed * _balance / (60 * 10 * 10);
    }

    function showFarmedTokens(uint64 farmTime) public view returns (uint128) {
        return farmedTokens + calcFarming(farmTime - farmChangeTime);
    }

    function showPlayerStats(uint64 farmTime) public view returns (PlayerStats playerStats) {
        return PlayerStats(
            owner,
            _balance,
            showFarmedTokens(farmTime),
            totalClaimed,
            farmingSpeed
        );
    }

    onBounce(TvmSlice body) external view {
        body;
        owner.transfer({value: 0, flag: 64});
    }

    receive() external view {
        owner.transfer({value: 0, flag: 64});
    }
}
