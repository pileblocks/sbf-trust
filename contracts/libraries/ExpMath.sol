pragma ton-solidity >= 0.57.0;

library ExpMath {

    function log_2(uint128 x) external returns (uint128) {

        require(x >= 1);
        uint128 n = 0;
        if (x >= 2**128) { x >>= 128; n += 128; }
        if (x >= 2**64) { x >>= 64; n += 64; }
        if (x >= 2**32) { x >>= 32; n += 32; }
        if (x >= 2**16) { x >>= 16; n += 16; }
        if (x >= 2**8) { x >>= 8; n += 8; }
        if (x >= 2**4) { x >>= 4; n += 4; }
        if (x >= 2**2) { x >>= 2; n += 2; }
        if (x >= 2**1) { /* x >>= 1; */ n += 1; }
        return uint128(n);
    }

    function getNumPower(uint128 contractedBalance) external returns(uint128) {
        uint128 power = 0;
        while (contractedBalance > 1) {
            contractedBalance = math.divr(contractedBalance, 10);
            power += 1;
        }
        return power;
    }

}
