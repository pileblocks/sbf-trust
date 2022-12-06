<template>
    <div class="position-relative">
        <div v-if="$store.state.Game.isLoading" class="position-absolute bottom-50 start-50">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div :class="{'loading-overlay': $store.state.Game.isLoading}">
            <p class="lead text-md-center text-start"><b>Roaster, Game</b> #{{$store.state.Game.gameId}}</p>
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Depo</th>
                    <th scope="col">Farming</th>
                    <th scope="col">Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Settlement capital</td>
                    <td><fancy-number :value="50000000000"/></td>
                    <td><fancy-number :value="0"/></td>
                    <td><fancy-number :value="0"/></td>
                  </tr>
                  <tr v-for="player in $store.state.Player.playerList" :key="player.owner">
                    <td>{{ player.owner | short }}</td>
                    <td><fancy-number :value="player.balance"/></td>
                    <td><fancy-number :value="player.farmedTokens"/></td>
                    <td><fancy-number :value="player.totalClaimed"/></td>
                  </tr>

                </tbody>
              </table>

            <div v-if="$store.state.Player.isJoined && $store.state.Game.computedStatus === 'ACTIVE'">
                    <button type="button" class="btn btn-light" :disabled="!$store.state.Player.isDepo" v-on:click="withdrawTokens">
                        Withdraw <fancy-number :value="$store.state.Player.withdrawAmount"/>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="'width: ' + calculateClaimCost + '%'" :aria-valuenow="calculateClaimCost" aria-valuemin="0" :aria-valuemax="calculateMaxClaimValue"></div>
                    </div>
                    </button>
            </div>


            <div class="text-start mt-4 mt-md-3">
              <p class="mb-0"><b>Current Pot</b>: <fancy-number :value="$store.state.Game.balance"/> EVER</p>
              <p class="mb-0"><b>Status: </b>
                  <span v-if="$store.state.Game.computedStatus === 'PENDING'" class="status-pending">PENDING</span>
                  <span v-else-if="$store.state.Game.computedStatus === 'ACTIVE'" class="status-active">ACTIVE</span>
                  <span v-else class="status-completed">COMPLETED</span>
              </p>

              <p class="mb-0">
                  <span v-if="$store.state.Game.computedStatus === 'PENDING'"><b>Starts in</b>: {{ timeLeft() }} min</span>
                  <span v-else-if="$store.state.Game.computedStatus === 'ACTIVE'"><b>Time</b>: {{ timeLeft() }} min left</span>

              </p>
              <p><b>Error rate</b>: {{ $store.state.Game.errorRate }}%</p>
            </div>
            <div v-if="$store.state.Wallet.address !== ''">
                <p class="lead">Want more?</p>
                <p>Send this referral link to your friends and receive <b>+15%</b> of their payments directly to your wallet.</p>
              <div>
                <input type="text" :value="'https://sbf-trust.com/' + $store.state.Wallet.address" :disabled="true">
                <button type="button" class="btn btn-outline-dark btn-sm"
                  v-clipboard:copy="'https://sbf-trust.com/' + $store.state.Wallet.address"
                  v-clipboard:success="onCopy">
                    <i class="bi bi-clipboard"></i>
                </button>
              </div>
            </div>

        </div>

    </div>

</template>

<script>
import FancyNumber from "@/components/FancyNumber";
import {CLAIM_COST_MAX, GAME_ACTIVE, MIN_MSG_VALUE} from "@/AppConst";
import {EverWalletApi} from "@/api/EverWallet";
export default {
    name: "GameInfo",
    components: {FancyNumber},
    data: function () {
        return {
            GAME_ACTIVE: GAME_ACTIVE
        }
    },
    methods: {
        timeLeft: function() {
            if (this.$store.state.Game.gameCompleted > 0 || this.$store.state.Game.gameStartTime === 0 || this.$store.state.Game.gameStartTime + 30 * 60 < Date.now() / 1000)
                return 0
            if (this.$store.state.Game.gameStartTime > Date.now()/1000) {
                return Math.ceil((this.$store.state.Game.gameStartTime - Date.now()/1000) / 60)
            }
            return Math.ceil((this.$store.state.Game.gameStartTime + 30 * 60 - Date.now()/1000) / 60);
        },
        withdrawTokens: async function () {
            this.$store.commit("Game/updateIsLoading", true);
            try {
                await EverWalletApi.farmingWallet.claimTokens(this.$store.state.Player.farmingWallet,
                    this.$store.state.Wallet.address, this.$store.state.Game.claimCost);
            } catch (e) {
                this.$store.commit("Game/updateIsLoading", false);
            }
        },
        onCopy: function () {
            console.log("Copied!")
        }

    },
    computed: {
        calculateClaimCost: function() {
            return (CLAIM_COST_MAX + MIN_MSG_VALUE - this.$store.state.Game.claimCost) * 100 / CLAIM_COST_MAX;
        },
        calculateMaxClaimValue: function () {
            return (CLAIM_COST_MAX - MIN_MSG_VALUE) * 100 / CLAIM_COST_MAX;
        }
    }


}
</script>

<style scoped>
.status-active {
    color: var(--bs-success);
    font-weight: bold;
}
.status-pending {
    color: var(--bs-gray-500);
    font-weight: bold;
}
.progress {
    height: 0.25em;
}
.progress-bar {
    background: linear-gradient(45deg, #2937f0, #9f1ae2) !important;
}
</style>