<template>
    <div class="container px-5">
        <div class="row gx-5">
            <div class="col-lg-6">
                <!-- Mashead text and app badges-->
                <div class="mb-5 mb-lg-0 text-center text-lg-start">
                    <game-field/>
                </div>
            </div>
            <div class="col-lg-6">
                <game-info/>
            </div>
        </div>
    </div>
</template>

<script>

import GameInfo from "@/components/GameInfo";
import GameField from "@/components/GameField";
export default {
  name: 'HomeView',
  components: {
      GameField,
    GameInfo
  }
}
</script>
<style>

</style>