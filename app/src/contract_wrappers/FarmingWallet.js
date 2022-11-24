const FarmingWalletContract = {
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
                        "name": "_affiliateAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "addTokens",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "claimTokens",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "onCheckStatus",
                "inputs": [
                    {
                        "name": "gameStatus",
                        "type": "uint8"
                    }
                ],
                "outputs": []
            },
            {
                "name": "raiseFarmingSpeed",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "drain",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "calcFarming",
                "inputs": [
                    {
                        "name": "time",
                        "type": "uint64"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "showFarmedTokens",
                "inputs": [
                    {
                        "name": "farmTime",
                        "type": "uint64"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "showPlayerStats",
                "inputs": [
                    {
                        "name": "farmTime",
                        "type": "uint64"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "name": "balance",
                                "type": "uint128"
                            },
                            {
                                "name": "farmedTokens",
                                "type": "uint128"
                            },
                            {
                                "name": "totalClaimed",
                                "type": "uint128"
                            },
                            {
                                "name": "farmingSpeed",
                                "type": "uint128"
                            }
                        ],
                        "name": "playerStats",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "game",
                "inputs": [],
                "outputs": [
                    {
                        "name": "game",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "farmingSpeed",
                "inputs": [],
                "outputs": [
                    {
                        "name": "farmingSpeed",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "_balance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "farmedTokens",
                "inputs": [],
                "outputs": [
                    {
                        "name": "farmedTokens",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "farmChangeTime",
                "inputs": [],
                "outputs": [
                    {
                        "name": "farmChangeTime",
                        "type": "uint64"
                    }
                ]
            },
            {
                "name": "affiliateAddress",
                "inputs": [],
                "outputs": [
                    {
                        "name": "affiliateAddress",
                        "type": "address"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "owner",
                "type": "address"
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
                "name": "owner",
                "type": "address"
            },
            {
                "name": "game",
                "type": "address"
            },
            {
                "name": "farmingSpeed",
                "type": "uint128"
            },
            {
                "name": "_balance",
                "type": "uint128"
            },
            {
                "name": "farmedTokens",
                "type": "uint128"
            },
            {
                "name": "farmChangeTime",
                "type": "uint64"
            },
            {
                "name": "affiliateAddress",
                "type": "address"
            },
            {
                "name": "totalClaimed",
                "type": "uint128"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "e1f9d08259aa1b9af6be7adb018a625a0011388a173904b0a1b6b8def768bdda",
};
module.exports = { FarmingWalletContract };