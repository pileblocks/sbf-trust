import {Address, Contract, ProviderRpcClient} from "everscale-inpage-provider";

import {LOADING_STATUS_PROVIDER_LOADED, LOADING_STATUS_PROVIDER_NOT_LOADED} from "@/AppConst";
import {PBGameContract} from "@/contract_wrappers/PBGame";
import {FarmingWalletContract} from "@/contract_wrappers/FarmingWallet";

export const EverWalletApi = {

    isWorking: async function (ever) {
        if (await ever.hasProvider()) {
            return LOADING_STATUS_PROVIDER_LOADED;
        }
        return LOADING_STATUS_PROVIDER_NOT_LOADED;
    },
    initWallet: async function (ever) {

        const {accountInteraction} = await ever.requestPermissions({
            permissions: ['basic', 'accountInteraction'],
        });
        if (accountInteraction == null) {
            return "";
        }
        return accountInteraction.address.toString();
    },
    isActiveContract: async function (ever, contractAddress) {
        return JSON.stringify(await ever.getFullContractState({address: contractAddress})) !== "{}";
    },

    game: {

        deployFarmingWallet: async function (currentGameAddress, playerAddress, affiliateAddress) {
            const ever = new ProviderRpcClient({});
            const game = new ever.Contract(PBGameContract.abi, currentGameAddress);
            const pAddress = new Address(playerAddress);
            await game
                .methods
                .deployFarmingWallet({affiliateAddress: affiliateAddress})
                .send({
                    from: pAddress,
                    amount: '500000000',
                    bounce: true,
                });
        },
        completeGameByTime: async function (currentGameAddress, playerAddress) {
            const ever = new ProviderRpcClient({});
            const game = new ever.Contract(PBGameContract.abi, currentGameAddress);
            const pAddress = new Address(playerAddress);
            await game
                .methods
                .completeGameByTime({})
                .send({
                    from: pAddress,
                    amount: '200000000',
                    bounce: true,
                });
        }
    },
    farmingWallet: {
        addTokens: async function (currentWalletAddress, playerAddress, tokenAmount) {
            const ever = new ProviderRpcClient({});
            const fWallet = new ever.Contract(FarmingWalletContract.abi, currentWalletAddress);
            const pAddress = new Address(playerAddress);
            await fWallet
                .methods
                .addTokens({})
                .send({
                    from: pAddress,
                    amount: tokenAmount.toString(),
                    bounce: true,
                });
        },
        claimTokens: async function (currentWalletAddress, playerAddress) {
            const ever = new ProviderRpcClient({});
            const fWallet = new ever.Contract(FarmingWalletContract.abi, currentWalletAddress);
            const pAddress = new Address(playerAddress);
            await fWallet
                .methods
                .claimTokens({})
                .send({
                    from: pAddress,
                    amount: '500000000',
                    bounce: true,
                });
        },
        raiseFarmingSpeed: async function (currentWalletAddress, playerAddress) {
            const ever = new ProviderRpcClient({});
            const fWallet = new ever.Contract(FarmingWalletContract.abi, currentWalletAddress);
            const pAddress = new Address(playerAddress);
            await fWallet
                .methods
                .raiseFarmingSpeed({})
                .send({
                    from: pAddress,
                    amount: '10000000000',
                    bounce: true,
                });
        },
    }
}