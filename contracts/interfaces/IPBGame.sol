pragma ton-solidity >= 0.47.0;


interface IPBGame {
    function deployFarmingWallet() external;
    function setGameStatus(uint8 newStatus) external;
    function completeGame() external;
    function drainByHost() external view;
    function tokenAdded(address ownerAddress, uint128 amount) external;
    function tokenRemoved(address ownerAddress, uint128 amount) external;
    function checkStatus(uint128 claimAmount) external responsible returns(uint8);

}
