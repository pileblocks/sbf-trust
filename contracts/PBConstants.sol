pragma ton-solidity >= 0.47.0;

contract PBConstants {

    uint16 constant WALLET_DOES_NOT_MATCH_OWNER = 1001;
    uint16 constant PUBLIC_KEY_MISSING = 1002;
    uint16 constant WRONG_PUBLIC_KEY = 1003;
    uint16 constant INVALID_TOKENS_PER_PUT = 1008;
    uint16 constant TOKEN_BALANCE_LOW = 1009;
    uint16 constant FAILED_FETCH_GAME_ID = 1010;
    uint16 constant INVALID_GAME_HOST = 1011;
    uint16 constant WRONG_GAME_STATUS = 1012;
    uint16 constant CALLER_NOT_GAME_HOST = 1013;
    uint16 constant WRONG_INDEX_OWNER = 1014;
    uint16 constant CALLER_NOT_IMAGE_OWNER = 1015;
    uint16 constant WRONG_GAME_ADDRESS = 1019;
    uint16 constant GAME_NOT_STARTED = 1020;
    uint16 constant WRONG_NOTIFICATION_SENDER = 1021;
    uint16 constant GAME_COMPLETED = 1022;
    uint16 constant WRONG_CLAIM_COST = 1023;

    // Game status
    uint8 constant STATUS_GAME_ACTIVE = 2;
    uint8 constant STATUS_GAME_COMPLETED = 3;

    uint128 constant MIN_WALLET_BALANCE = 100_000_000;
    uint64 constant MAX_CLAIM_COST = 8_000_000_000;

}
