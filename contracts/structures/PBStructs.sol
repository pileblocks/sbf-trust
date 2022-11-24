pragma ton-solidity >= 0.47.0;

struct GameInfo {
    uint64 gameStartTime;
    uint32 gameId;
    address gameHost;
    uint8 status;
    uint128 gamePot;
    uint8 errorRate;
    uint64 gameCompleted;
    uint128 initialBalance;
}

struct PlayerStats {
    address owner;
    uint128 balance;
    uint128 farmedTokens;
    uint128 totalClaimed;
    uint128 farmingSpeed;
}
