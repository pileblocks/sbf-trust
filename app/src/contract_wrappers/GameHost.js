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
    codeHash: "28cae8e3d07880a0d3c8627d6f43a05c10eecc69190663803d1e14009cab62a7",
};
module.exports = { GameHostContract };