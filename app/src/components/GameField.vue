<template>
    <div class="position-relative">
        <div v-if="$store.state.Game.isLoading" class="position-absolute bottom-50 start-50">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div :class="{'loading-overlay': $store.state.Game.isLoading}">
            <div
                v-if="$store.state.Player.isDepo === false && $store.state.Game.computedStatus === 'ACTIVE' || $store.state.Game.computedStatus === 'PENDING'">
                <h1 class="display-3 lh-1 mb-3">Deposit and get 10% ROI per minute<small><sup
                    class="text-secondary">✱</sup></small></h1>
                <p class="small fw-normal text-muted mb-2">* - We do not take any responsibility for your tokens and if shit happens we won't cover. If you're smart and fast, it is possible though to grab your swag since the smart contract is the law. Read the rules, study our smart contract, do DIOR.</p>
                <div v-if="$store.state.Game.computedStatus === 'PENDING'">
                    <game-navigation/>
                </div>
            </div>

            <div v-if="$store.state.Player.isDepo === true && $store.state.Game.computedStatus === 'ACTIVE'">
                <p class="lead">
                    Your earnings:
                </p>
                <h1 class="display-3 lh-1 mb-3">
                    <fancy-number :value="$store.state.Player.earnedAmount"/>
                </h1>
            </div>
            <div class="d-flex flex-column flex-lg-row align-items-center">
                <div v-if="$store.state.Game.computedStatus === 'ACTIVE' && $store.state.Player.isJoined === false" class="mt-3">
                    <div class="d-flex">
                    <game-navigation/>
                    <button type="button" class="btn btn-light btn-lg px-4 py-2"
                            :disabled="$store.state.Wallet.address === ''" v-on:click="joinGame">
                        Join Game
                        <i class="bi bi-person-plus-fill"></i>
                    </button>
                    </div>
                    <div class="alert alert-secondary mt-2" role="alert" v-show="$store.state.Wallet.address === ''">
                        Connect your wallet using the top menu
                    </div>
                </div>
                <div v-if="$store.state.Game.computedStatus === 'ACTIVE' && $store.state.Player.isJoined === true">
                    <div class="d-flex">
                        <button type="button" class="btn btn-sm btn-outline-dark mb-3 me-2" v-on:click="depositTokens(10)">
                            +10 EVER
                            <i class="bi bi-piggy-bank"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-dark mb-3 me-2" v-on:click="depositTokens(50)">
                            +50 EVER
                            <i class="bi bi-piggy-bank"></i>
                        </button>
                        <button type="button" class="btn btn-light mb-3 me-2" v-on:click="depositTokens(100)">
                            Deposit +100 EVER
                            <i class="bi bi-piggy-bank"></i>
                        </button>
                    </div>
                    <div class="d-flex flex-column">
                        <p class="lead">Farming speed: x{{ $store.state.Player.farmingSpeed / 10 }}</p>
                        <button type="button" class="btn btn-sm btn-outline-dark mb-3 me-2" v-on:click="raiseSpeed">
                            +10% SPEED
                            <i class="bi bi-speedometer2"></i>
                        </button>
                    </div>
                    <game-navigation/>
                </div>
                <div v-if="$store.state.Game.computedStatus === 'COMPLETED'">
                    <div class="card">
                        <div class="card-header">
                            Breaking News
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                Unfortunately, we could not meet your expectations. Please stay assured that this does
                                not have to do with you personally.
                            </p>
                            <p class="card-text">
                                We understand your frustration and pain and will do our best to figure out the reason of
                                this tragedy and provide a guidance and assistance. We will do whatever we can to
                                demonstrate that you always can rely on us as a company. Hard times require party hard.
                                Don't take it seriously. Tokens are just tokens, relax. We had good times
                                enjoying them, of course, and there will be no way you can recover your losses
                                originated during this game.
                            </p>
                            <p>
                                <b>Note:</b> Reload the page after you start the new game!
                            </p>
                            <div class="d-flex">
                                <game-navigation/>
                                <button class="btn btn-sm btn-light mb-3 me-2 d-flex flex-column"
                                        v-on:click="startNewGame" :disabled="$store.state.Wallet.address === '' || $store.state.Game.status === GAME_COMPLETED">
                                    <span>START NEW</span>
                                    <small>On success you get 1 EVER</small>
                                </button>
                            </div>

                            <div class="alert alert-secondary" role="alert" v-show="$store.state.Wallet.address === ''">
                                Connect your wallet using the top menu
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import {GAME_ACTIVE, GAME_COMPLETED} from "@/AppConst";
import FancyNumber from "@/components/FancyNumber";
import GameNavigation from "@/components/GameNavigation";
import {EverWalletApi} from "@/api/EverWallet";

export default {
    components: {GameNavigation, FancyNumber},
    data: function () {
        return {
            GAME_ACTIVE: GAME_ACTIVE,
            GAME_COMPLETED: GAME_COMPLETED
        }
    },
    methods: {
        startNewGame: async function () {
            this.$store.commit("Game/updateIsLoading", true);
            try {
                await EverWalletApi.game.completeGameByTime(this.$store.state.Game.account.address,
                    this.$store.state.Wallet.address)
            } catch (e) {
                this.$store.commit("Game/updateIsLoading", false);
            }
        },
        joinGame: async function () {
            this.$store.commit("Game/updateIsLoading", true);

            let affiliateAddress = localStorage.getItem("affiliateAddress");
            console.log(`Joined with the affiliate: ${affiliateAddress}`);
            try {
                await EverWalletApi.game.deployFarmingWallet(this.$store.state.Game.account.address,
                    this.$store.state.Wallet.address, affiliateAddress)
            } catch (e) {
                this.$store.commit("Game/updateIsLoading", false);
            }
        },
        depositTokens: async function (tokenAmount) {
            this.$store.commit("Game/updateIsLoading", true);
            try {
                await EverWalletApi.farmingWallet.addTokens(this.$store.state.Player.farmingWallet,
                    this.$store.state.Wallet.address, tokenAmount * 1e9);
            } catch (e) {
                this.$store.commit("Game/updateIsLoading", false);
            }
        },
        raiseSpeed: async function (tokenAmount) {
            this.$store.commit("Game/updateIsLoading", true);
            try {
                await EverWalletApi.farmingWallet.raiseFarmingSpeed(this.$store.state.Player.farmingWallet,
                    this.$store.state.Wallet.address);
            } catch (e) {
                this.$store.commit("Game/updateIsLoading", false);
            }
        },
    },
    name: "GameField"
}
</script>

<style scoped>

</style>