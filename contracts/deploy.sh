#!/usr/bin/env bash

NWK=se

#se
#dev
#main

if [ $NWK == "se" ]
then
    NETWORK=127.0.0.1
    SIGNER=norton
    PUBKEY=0x1bdfe03401657bfb1aae235be487b9641f0056965eb5573c17ed3685750e375a
elif [ $NWK == "dev" ]
then
    NETWORK=net.ton.dev
    SIGNER=norton
    PUBKEY=0x1bdfe03401657bfb1aae235be487b9641f0056965eb5573c17ed3685750e375a
else
    NETWORK=main.ton.dev
    SIGNER=pile_signer
    PUBKEY=0xc2cc1115bc700536f0dc756623777cde6f241a38be7e60cb11bc80fc4c43879c
fi

everdev sol set --compiler 0.57.0 --linker 0.14.19

everdev sol compile GameIndex.sol
everdev sol compile FarmingWallet.sol
everdev sol compile PBGame.sol
everdev sol compile GameHost.sol

everdev js wrap GameIndex.sol --output ../app/src/contract_wrappers/GameIndex.js
everdev js wrap FarmingWallet.sol --output ../app/src/contract_wrappers/FarmingWallet.js
everdev js wrap PBGame.sol --output ../app/src/contract_wrappers/PBGame.js
everdev js wrap GameHost.sol --output ../app/src/contract_wrappers/GameHost.js


GAME_CODE=$(tonos-cli decode stateinit --tvc PBGame.tvc | tail -n +5 | ../app/node_modules/node-jq/bin/jq -r .code)
INDEX_CODE=$(tonos-cli decode stateinit --tvc GameIndex.tvc | tail -n +5 | ../app/node_modules/node-jq/bin/jq -r .code)
FARMING_CODE=$(tonos-cli decode stateinit --tvc FarmingWallet.tvc | tail -n +5 | ../app/node_modules/node-jq/bin/jq -r .code)

NONCE=$(date +%s)
echo $GAME_CODE

echo "Deploying game host..."
GAME_HOST=$(everdev contract deploy GameHost.abi.json -n $NWK -s $SIGNER -v 1000000000000 -d _randomNonce:$NONCE -i _indexCode:\"$INDEX_CODE\",_gameCode:\"$GAME_CODE\",_farmingCode:\"$FARMING_CODE\" | grep "Address:" | cut -d " " -f 4)
echo "Host address: ${GAME_HOST}"

TEMP=$(everdev contract run GameHost.abi.json -a $GAME_HOST -n $NWK -s $SIGNER forceStartNewGame -i startTime:0)
echo "Starting new game"
