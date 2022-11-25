<template>
    <div></div>
</template>

<script>
import {GameHostContract} from "@/contract_wrappers/GameHost";
import {Account} from "@tonclient/appkit";
import {MessageBodyType, signerNone} from "@tonclient/core";
import {gameHostApi} from "@/api/GameHostApi";
import {PBGameContract} from "@/contract_wrappers/PBGame";
import {gameApi} from "@/api/GameApi";
import {playerApi} from "@/api/PlayerApi";
import {FarmingWalletContract} from "@/contract_wrappers/FarmingWallet";
import {GameIndexContract} from "@/contract_wrappers/GameIndex";
import {gameIndexApi} from "@/api/GameIndexApi";
import {GAME_COMPLETED, LOADING_STATUS_PROVIDER_LOADED} from "@/AppConst";
import {EverWalletApi} from "@/api/EverWallet";
import {ProviderRpcClient} from "everscale-inpage-provider";

export default {
    name: "EverxLoader",
    methods: {
        initHost: async function () {
            let client = this.everx;
            return new Account(GameHostContract, {
                    address: process.env.VUE_APP_HOST_CONTRACT,
                    client,
                    signer: signerNone(),
                });
        },
        initGame: async function (gameAddress) {
            let client = this.everx;
            return new Account(PBGameContract, {
                    address: gameAddress,
                    client,
                    signer: signerNone(),
                });
        },
        getPlayerAccounts: async function (gameAccount) {
            let client = this.everx;

            let farmingWalletHash = await gameApi.getFarmingHash(gameAccount);
            await gameAccount.free();
            let queryString = `query {
            accounts(
                filter: {
                  code_hash: {eq: "${farmingWalletHash}"
                  }
                }
            ) {id}
            }`
            let response = await this.everx.net.query({"query": queryString });
            return response.result.data.accounts;
        },
        getPlayerStats: async function (gameAccount, gameCompleted) {
        let client = this.everx;
            let playerList = [];
            for (let acc of await this.getPlayerAccounts(gameAccount)) {
                let playerAccount = new Account(FarmingWalletContract, {
                        address: acc.id,
                        client,
                        signer: signerNone(),
                    });
                let gameTime = gameCompleted === 0? parseInt(Date.now()/1000) :  gameCompleted;
                let pStats = await playerApi.showPlayerStats(playerAccount, gameTime);
                playerList.push({
                    "owner": pStats.owner,
                    "balance": parseInt(pStats.balance),
                    "farmedTokens": parseInt(pStats.farmedTokens),
                    "totalClaimed": parseInt(pStats.totalClaimed),
                    "farmingWallet": acc.id,
                    "farmingSpeed": parseInt(pStats.farmingSpeed),
                });
                await playerAccount.free();
            }
            return playerList;
        },
        getGameAddressById: async function (indexAddress) {
            let client = this.everx;
            let indexAccount = new Account(GameIndexContract, {
                address: indexAddress,
                client,
                signer: signerNone(),
            });
            await indexAccount.free();
            return await gameIndexApi.getGameAddress(indexAccount);
        },
        reloadGame: async function (gameAccount) {
            this.$store.commit("Game/updateBalance", parseInt(await gameAccount.getBalance()))
            let gameInfo = await gameApi.getInfo(gameAccount);
            this.$store.commit("Game/updateGameInfo", gameInfo);
            this.$store.commit("Player/updatePlayerList", await this.getPlayerStats(gameAccount, gameInfo.gameCompleted));
            let compStatus = this.$store.getters["Game/gameComputedStatus"]();
            this.$store.commit("Game/updateComputedStatus", compStatus);
            await this.$store.dispatch("Player/updateJoinedDepo");
            console.log("Data reloaded");
        },

        initSubscription: async function(ever, gameAddress) {
            const game = new ever.Contract(PBGameContract.abi, gameAddress);
            const subscription = new ever.Subscriber();
            subscription
                .transactions(this.$store.state.Game.account.address)
                .on(async (data) => {
                    for (const tr of data.transactions) {
                        const transactionEvents = await game.decodeTransactionEvents({
                            transaction: tr
                        })
                        for (const trEvent of transactionEvents) {
                            switch (trEvent.event) {
                                case "OperationCompleted":
                                    await this.operationCompletedHandler(trEvent.data);
                                    break;
                            }
                        }
                    }
                });

        },
        operationCompletedHandler: async function (op) {
            console.log(op);
            if (op.player.toString() === this.$store.state.Wallet.address) {
                this.$store.commit("Game/updateIsLoading", false);
            }
            switch (op.name) {
                case "GameCompleted":
                    window.location.href = '/';
                    break;
                case "GameCompletedBug":
                    window.location.href = '/';
                    break;
                case "PlayerJoined":
                    if (op.player.toString() === this.$store.state.Wallet.address) {
                        this.$store.commit("Player/updateJoined", true);
                    }
                    break;
                case "TokensAdded":
                    if (op.player.toString() === this.$store.state.Wallet.address) {
                        this.$store.commit("Player/updateDepo", true);
                    }
                    break;
            }
        },

    },

    async mounted() {

        this.$store.commit("Game/updateIsLoading", true);

        let hostAccount = await this.initHost();
        this.$store.commit("Game/updateLastId", await gameHostApi.getCurrentGameId(hostAccount));

        if (this.$route.params.affiliateAddress !== undefined) {
            localStorage.setItem("affiliateAddress", this.$route.params.affiliateAddress);
        }

        console.log(`Affiliate: ${this.$route.params.affiliateAddress}`);
        const ever = new ProviderRpcClient({
        });

        let isInstalled = await EverWalletApi.isWorking(ever) === LOADING_STATUS_PROVIDER_LOADED;
        this.$store.commit("Wallet/updateIsInstalled", isInstalled);

        let gameAddress = "";
        if (this.$route.name === "game") {
            let gameId = parseInt(this.$route.params.id);
            let indexAddress = await gameHostApi.getGameIndexAddress(hostAccount, gameId);
            gameAddress = await this.getGameAddressById(indexAddress);
        } else {
            gameAddress = await gameHostApi.getCurrentGameAddress(hostAccount);
        }
        console.log(`Game: ${gameAddress}`);
        let gameAccount = await this.initGame(gameAddress);
        this.$store.commit("Game/updateAccount", gameAccount);

        await this.initSubscription(ever, gameAddress);

        await this.reloadGame(this.$store.state.Game.account);

        this.$store.commit("Game/updateIsLoading", false);

        let sleep = duration => new Promise(resolve => setTimeout(resolve, duration))
        let poll = (promiseFn, duration) => promiseFn().then(
                     sleep(duration).then(() => poll(promiseFn, duration)))
        poll(() => new Promise(() => {
            this.reloadGame(this.$store.state.Game.account);
        }), 2000)

    }
}
</script>

<style scoped>

</style>