pragma ton-solidity >= 0.47.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./PBConstants.sol";

contract GameIndex is PBConstants {

    address public gameAddress;
    uint32 static gameId;

    constructor(address _gameAddress) public {
        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        (address hostAddress) = optSalt
            .get()
            .toSlice()
            .decode(address);
        require(msg.sender == hostAddress, WRONG_PUBLIC_KEY);
        tvm.accept();
        gameAddress = _gameAddress;
    }

}
