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
    codeHash: "df5ebc88262a61b39368a13f2176ff6ee5e9906ce6cdaa86f52035dab3d9e20a",
};
module.exports = { FarmingWalletContract };