pragma ton-solidity >= 0.47.0;

import "../structures/PBStructs.sol";

interface IFarmingWallet {
    function releaseTokens(uint128 amount) external;
    function claimTiles(address genesis) external;
    function setFarmingSpeed(uint128 newSpeed) external;
}
