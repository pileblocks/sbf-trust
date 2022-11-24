<template>
    <div class="d-inline">
        <span class="number-value">{{ valueInt }}<small class="text-muted">.{{ valueFloat }}</small></span>
    </div>
</template>

<script>
import BigNumber from "bignumber.js";
export default {
    name: "FancyNumber",
    props: {
        value: Number
    },
    computed: {
        valueInt: function() {
            return new BigNumber(new BigNumber(this.value).shiftedBy(-9).toFixed(2).split('.')[0]).toFormat(0)
        },
        valueFloat: function() {
            return new BigNumber(this.value).shiftedBy(-9).toFixed(2).split('.')[1]
        }
    }
}
</script>

<style scoped>

</style>