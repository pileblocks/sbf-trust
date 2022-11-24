pragma ton-solidity >= 0.47.0;

import "../structures/PBStructs.sol";

interface IGameHost {
    function onGameCompleted(GameInfo gameInfo) external;
    function deployGame(uint24[] _renderSettings, string _gameName, uint64 _gameStartTime) external responsible returns (address);
    function startNewGame() external;
}
