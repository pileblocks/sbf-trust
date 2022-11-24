const PBGameContract = {
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
                        "name": "_gameStartTime",
                        "type": "uint64"
                    },
                    {
                        "name": "_errorRate",
                        "type": "uint8"
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
                "name": "deployFarmingWallet",
                "inputs": [
                    {
                        "name": "affiliateAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "tokenAdded",
                "inputs": [
                    {
                        "name": "ownerAddress",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "checkStatus",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "claimAmount",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint8"
                    }
                ]
            },
            {
                "name": "tokenRemoved",
                "inputs": [
                    {
                        "name": "ownerAddress",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "completeGameByTime",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "drainByHost",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "getFarmingAddress",
                "inputs": [
                    {
                        "name": "walletOwner",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getFarmingHash",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_farmingHash",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "getInfo",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "gameStartTime",
                                "type": "uint64"
                            },
                            {
                                "name": "gameId",
                                "type": "uint32"
                            },
                            {
                                "name": "gameHost",
                                "type": "address"
                            },
                            {
                                "name": "status",
                                "type": "uint8"
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
                                "name": "gameCompleted",
                                "type": "uint64"
                            },
                            {
                                "name": "initialBalance",
                                "type": "uint128"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "farmingCode",
                "type": "cell"
            }
        ],
        "events": [
            {
                "name": "OperationCompleted",
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "name": "gameStatus",
                        "type": "uint8"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint64"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            }
        ],
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
                "name": "farmingCode",
                "type": "cell"
            },
            {
                "name": "gameId",
                "type": "uint32"
            },
            {
                "name": "gamePot",
                "type": "uint128"
            },
            {
                "name": "gameStartTime",
                "type": "uint64"
            },
            {
                "name": "status",
                "type": "uint8"
            },
            {
                "name": "errorRate",
                "type": "uint8"
            },
            {
                "name": "gameHost",
                "type": "address"
            },
            {
                "name": "gameCompleted",
                "type": "uint64"
            },
            {
                "name": "initialBalance",
                "type": "uint128"
            }
        ]
    },
    tvc: "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",
    code: "te6ccgECVwEACusAAgaK2zVWAQQkiu1TIOMDIMD/4wIgwP7jAvILUwMCVQO+7UTQ10nDAfhmifhpIds80wABjhqBAgDXGCD5AQHTAAGU0/8DAZMC+ELi+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jxEQgQDeu1E0NdJwwH4ZiLQ0wP6QDD4aak4APhEf29xggiYloBvcm1vc3BvdPhk3CHHAOMCIdcNH/K8IeMDAds88jxSUgQDPCCCEDCzd/W74wIgghBSlKDXu+MCIIIQYfW5YLvjAjsRBQM8IIIQV1t2oLrjAiCCEF9QN6i64wIgghBh9blguuMCDAcGA34w+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8IY4fI9DTAfpAMDHIz4cgznHPC2EByM+Th9blgs7NyXD7AJEw4uMA8gBRHU8DOjD4RvLgTPhCbuMAIZPU0dDe+kDTf9HbPDDbPPIAUQhHBGBopvtg8tBI+Eki2zzHBfLj6fhOwALy4/T4I/hNgQcIoLU/u/Lj/vgA2zyOgI6A4lsdGxgJAhIg+Ey+joCOgOIYCgJg+EwhobV/+Gwg+CP4TiSIicjOzM7LB8s/y3/JcPsAUwHIz4WIzgH6AoBrz0DJcPsAC0kAGlRva2Vuc1JlbW92ZWQDNDD4RvLgTPhCbuMAIZPU0dDe+kDR2zzjAPIAUQ1PBPBopv5gghAdzWUAtX++8uPx+CP4Tbn4TsMCsY4R+EnIz4WIzoBvz0DJgED7ADDgcMjL/3BtgED0Q/hJcViAQPQWyPQAyds8yM+EgPQA9ADPgclw+CP4TvhJiInIzszOywfLP8t/yXD7ACD5AMjPigBAy//Iz4WIzxMeEEkOAU6L4AAAAAAAAAAAAAAAAABwzxYh2zzMz4MByM+RHVlTcs7NyYBA+wAPADTQ0gABk9IEMd7SAAGT0gEx3vQE9AT0BNFfAwAYUGxheWVySm9pbmVkBFAgghAydkaTuuMCIIIQOOxWJ7rjAiCCEE208Mi64wIgghBSlKDXuuMCOR8UEgMkMPhG8uBM+EJu4wDR2zzjAPIAURNPAEb4SfhQxwXy4/WCEAX14QBw+wL4UMjPhYjOgG/PQMmBAID7AAM6MPhG8uBM+EJu4wAhk9TR0N76QNN/0ds8MNs88gBRFUcBFGim+2Dy0EiOgNgWBKz4SSLbPMcF8uPp+CP4TbkgjhEw+CP4TYEHCKC1P7z4TsMCsd+OEfhJyM+FiM6Ab89AyYBA+wBb4PhMIaC1f/hs+CP4TlUCiInIzszOywfLP8t/yXD7AB0cSRcCCts8joDeGxgBBNs8GQRec/hu+CP4cfhM+CP4TvgoiInIzszOywfLP8t/yXD7APhQyM+FiM6JzxbJcPsA2zwaSUxLACBHYW1lQ29tcGxldGVkQnVnABb4JfgVgGT4EfhPuwAWVG9rZW5zQWRkZWQBWnDIy/9wbYBA9EMBcViAQPQWyPQAyds8yM+EgPQA9ADPgcn5AMjPigBAy//J0B4BFvgoyM74StAByds8NAN+MPhG8uBM+EJu4wDR2zwhjicj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAALjsVieM8WzMlw+wCRMOLjAPIAUSBPAzL4KMjObwDI+ErQVQLJ2zz5AHAgf3DbPNs8NCMhARiWIW+IwACzjoDoyTEiAQwh2zwzzxEoBFAlzzWrAiCOgN9VApKAMJKAIOJYlSXPhLY23iGlMiGOgN9VA4AQ2zwgMjEuJAQg2zwljoDeUwO7joCOgOJfBi0pJiUDIiOOgORfJ9s8OMg3UwOhjoDkJzMnAQggjoDkJwE6Ids8MyDBCpMngDCZU3WSgFeSgDfi4iKgzwsHODAoABxvjW+NWSBviJJvjJEw4gIsU1C5JsJ/sfLQRVNQoVMEu46AjoDiMCsqAUQkllNzzwsHOORfKNs8Ocg4UwShllNzzwsHOOSAfyGhJaA1MwEiIJZTc88LBzjkU0ChNSSOgN8sARRfKNs8Ocg4gH81MwAmIG+IIJulgQD/qAFvi2+IoJEx4gIibwAijoDhcJMjwwCOgOgwbCEwLwESXakMMjRc2zwyMwEKcNs8bCEzARRfJts8N8g2gH8yMwEUXyfbPDjINzCAfzMAOgEgb4ifb40gb4iBAP+hlG+MbwDfkm8A4lhvjG+MAhYhizits1jHBYqK4jY1AQgB2zzJNwEmAdTUMBLQ2zzIz44rbNYSzM8RyTcBZtWLL0pA1yb0BNMJMSDXSpHUjoDiiy9KGNcmMAHIz4vSkPQAgCDPCwnPi9KGzBLMyM8RzjgBBIgBVQOaMPhG8uBM+EJu4wDR2zwhjjUj0NMB+kAwMcjPhyDOcc8LYQHIz5LJ2RpOAW8oXnDLP8sfzssHy3/LB8s/AcjLf83NyXD7AJEw4uMA8gBROk8AJPhN+Ev4UPhO+Ez4T/hR+FJvCARQIIIQGkYJ7brjAiCCEB59/je64wIgghAs4gkkuuMCIIIQMLN39brjAk1GPjwDKjD4RvLgTPhCbuMA0wfR2zww2zzyAFE9RwAkaKb7YPLQSPhJ+FDHBfLj9fhuBKQw+EJu4wD4RvJz0z/TB9H4QYjIz44rbNbMzsnbPCBu8tPyIG7yf9DTH/pAMAH4a/hw+En4UMcF8uPzAfhtaKb+YPhsaKb+YPhycvhu+G/bPPIAQlY/RwIY0CCLOK2zWMcFioriQEEBCtdN0Ns8QQBC10zQiy9KQNcm9AQx0wkxiy9KGNcmINdKwgGS102SMG3iAhbtRNDXScIBjoDjDUNRAmpw7UTQ9AVxIYBA9A+OgN9wX0CJcCD4cvhx+HD4b/hu+G34bPhr+GqAQPQO8r3XC//4YnD4Y0VEAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAQKIVQMmMPhG8uBM+EJu4wDR2zww2zzyAFFIRwBo+FL4UfhQ+E/4TvhN+Ez4S/hK+EP4QsjL/8s/z4PMyx/Lf8s/ywfLB1UgyM7LP8t/zcntVAT+aKb7YPLQSPgj+E2BBwigtT++8uBk+E7AAvLj9Gim/mCCEAvrwgC1f77y4/H4AHP4bvgj+HH4UMjPhYjOic8WyXD7APhJyM+FiM6NBJDuaygAAAAAAAAAAAAAAAAAAEDPFslw+wDbPPhM+CP4TvgoiInIzszOywfLP8t/yXD7AExLSkkAIsAAAAAAAAAAAAAAAABFP/DhABpHYW1lQ29tcGxldGVkADSCEAX14QBw+wL4UMjPhYjOgG/PQMmBAID7AAArQF9eEAAAAAAAAAAAAAAAAAAAJFVb0wT8MPhG8uBM+EJu4wDTH/hEWG91+GQhk9TR0N7Tf9HbPCGOJiPQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAAmkYJ7YzxbLB8lwji/4RCBvEyFvEvhJVQJvEchyz0DKAHPPQM4B+gL0AIBqz0D4RG8VzwsfywfJ+ERvFOL7AOMAUVBPTgAE8gAAKO1E0NP/0z8x+ENYyMv/yz/Oye1UAFr4I/hNgQcIoLU/vPgnbxBYubGc+ERwb3KAQG90+GRz4PhEcG9ygEBvdPhk+E4Aau1E0NP/0z/TADHU0x/Tf9M/0wfTB9TR0PpA0z/Tf9H4cvhx+HD4b/hu+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KFVVAAUc29sIDAuNTcuMAAAAAwg+GHtHtk=",
    codeHash: "5590a613f57ca05f24dc6bedb641c6b9c217f1386c8a4d7099307af520f395f9",
};
module.exports = { PBGameContract };