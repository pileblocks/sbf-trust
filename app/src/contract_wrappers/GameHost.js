const GameHostContract = {
    abi: {
        "ABI version": 2,
        "version": "2.2",
        "header": [
            "pubkey",
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [
                    {
                        "name": "_indexCode",
                        "type": "cell"
                    },
                    {
                        "name": "_gameCode",
                        "type": "cell"
                    },
                    {
                        "name": "_farmingCode",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getGameCode",
                "inputs": [
                    {
                        "name": "gameId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "getGameHash",
                "inputs": [
                    {
                        "name": "gameId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "setGameCode",
                "inputs": [
                    {
                        "name": "_gameCode",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setGameStatus",
                "inputs": [
                    {
                        "name": "gameAddress",
                        "type": "address"
                    },
                    {
                        "name": "newStatus",
                        "type": "uint8"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setGamePot",
                "inputs": [
                    {
                        "name": "newGamePot",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setErrorRate",
                "inputs": [
                    {
                        "name": "_errorRate",
                        "type": "uint8"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setFarmingCode",
                "inputs": [
                    {
                        "name": "_farmingCode",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "startNewGame",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "forceStartNewGame",
                "inputs": [
                    {
                        "name": "startTime",
                        "type": "uint64"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getGameAddress",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_gameAddress",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getIndexAddress",
                "inputs": [
                    {
                        "name": "_gameId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "_indexAddress",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "drain",
                "inputs": [
                    {
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "drainGame",
                "inputs": [
                    {
                        "name": "gameAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "currentGameId",
                "inputs": [],
                "outputs": [
                    {
                        "name": "currentGameId",
                        "type": "uint32"
                    }
                ]
            },
            {
                "name": "gamePot",
                "inputs": [],
                "outputs": [
                    {
                        "name": "gamePot",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "errorRate",
                "inputs": [],
                "outputs": [
                    {
                        "name": "errorRate",
                        "type": "uint8"
                    }
                ]
            },
            {
                "name": "indexCode",
                "inputs": [],
                "outputs": [
                    {
                        "name": "indexCode",
                        "type": "cell"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_randomNonce",
                "type": "uint64"
            }
        ],
        "events": [],
        "fields": [
            {
                "name": "_pubkey",
                "type": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64"
            },
            {
                "name": "_constructorFlag",
                "type": "bool"
            },
            {
                "name": "_randomNonce",
                "type": "uint64"
            },
            {
                "name": "currentGameId",
                "type": "uint32"
            },
            {
                "name": "gamePot",
                "type": "uint128"
            },
            {
                "name": "errorRate",
                "type": "uint8"
            },
            {
                "name": "indexCode",
                "type": "cell"
            },
            {
                "name": "gameCode",
                "type": "cell"
            },
            {
                "name": "farmingCode",
                "type": "cell"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "480d8b5f04d2d11706061837ca10789b07d3e97cb9f73540e48a689c92bb379c",
};
module.exports = { GameHostContract };