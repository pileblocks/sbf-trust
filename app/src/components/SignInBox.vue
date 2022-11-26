<template>
<div>
    <div v-if="!$store.state.Wallet.isInstalled">
        <a class="btn btn-light btn-sm" href="https://everwallet.net/" target="_blank">
            Install Wallet
        </a>
    </div>
    <div v-else-if="$store.state.Wallet.isInstalled">
        <div v-if="$store.state.Wallet.address === ''">
            <button type="button" class="btn btn-light btn-sm" v-on:click="connectWallet">
                Connect
                <i class="bi bi-wallet2"></i>
            </button>
        </div>
        <div v-else>
            <span class="address-outline">
                {{$store.state.Wallet.address | short }}
                <i class="bi bi-x-circle-fill logout-btn" v-on:click="disconnectWallet"></i>
            </span>
        </div>
    </div>
</div>
</template>

<script>
import {EverWalletApi} from "@/api/EverWallet";
import {ProviderRpcClient} from "everscale-inpage-provider";
import {PBGameContract} from "@/contract_wrappers/PBGame";

export default {
    name: "SignInBox",
    data: function () {
        return {
            gameSubscription: null
        }
    },
    methods: {
        connectWallet: async function () {
            const ever = new ProviderRpcClient({});
            this.$store.commit("Game/updateProvider", ever);
            let address = await EverWalletApi.initWallet(ever);
            let gameAccount = await EverWalletApi.initGame(this.everx, this.$store.state.Game.account.address);
            this.$store.commit("Game/updateAccount", gameAccount);
            this.$store.commit("Wallet/updateAddress", address);
            await this.$store.dispatch("Player/updateJoinedDepo");
            console.log(`Subscription to: ${this.$store.state.Game.account.address}`);
            await this.initSubscription(ever, this.$store.state.Game.account.address);
        },
        disconnectWallet: async function () {
            const ever = this.$store.state.Game.provider;
            await this.gameSubscription.unsubscribe();
            await ever.disconnect();
            this.$store.commit("Wallet/updateAddress", "");
            await this.$store.dispatch("Player/updateJoinedDepo");
        },
        initSubscription: async function(ever, gameAddress) {
            const game = new ever.Contract(PBGameContract.abi, gameAddress);
            this.gameSubscription = new ever.Subscriber();
            this.gameSubscription
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
        }
    }
}
</script>

<style scoped>
.logout-btn {
    color: var(--bs-danger);
}
.address-outline {
  background-color: white;
  border-color: #1a1e21;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  padding: 5px 10px;
}
</style>