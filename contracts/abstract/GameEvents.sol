pragma ton-solidity >= 0.57.0;

abstract contract GameEvents {

    event OperationCompleted(
        string name,
        address player,
        uint8 gameStatus,
        uint64 timestamp,
        uint128 value
    );

}