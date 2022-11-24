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

export default {
    name: "SignInBox",
    methods: {
        connectWallet: async function () {
            const ever = new ProviderRpcClient({});
            let address = await EverWalletApi.initWallet(ever);
            this.$store.commit("Wallet/updateAddress", address);
            await this.$store.dispatch("Player/updateJoinedDepo");
        },
        disconnectWallet: async function () {
            const ever = new ProviderRpcClient({});
            await ever.disconnect();
            this.$store.commit("Wallet/updateAddress", "");
            await this.$store.dispatch("Player/updateJoinedDepo");
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