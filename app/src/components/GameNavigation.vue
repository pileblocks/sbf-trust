<template>
    <div class="d-flex justify-content-center align-items-center">

        <button type="button" class="btn btn-sm btn-outline-dark me-2" :disabled="$store.state.Game.gameId <= 1" v-on:click="loadPrevGame">
            <i class="bi bi-arrow-left"></i>
        </button>

        <button type="button" class="btn btn-sm btn-outline-dark me-2" :disabled="$store.state.Game.gameId >= $store.state.Game.lastId - 1" v-on:click="loadNextGame">
            <i class="bi bi-arrow-right"></i>
        </button>


     </div>
</template>

<script>
export default {
    name: "GameNavigation",
    methods: {
        loadPrevGame: function () {
            window.location.href = `/game/${this.$store.state.Game.gameId - 1}`;
        },
        loadNextGame: function () {
            window.location.href = `/game/${this.$store.state.Game.gameId + 1}`;
        }
    }
}
</script>

<style scoped>
</style>