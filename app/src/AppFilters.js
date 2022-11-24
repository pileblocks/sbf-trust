import Vue from 'vue'
import BigNumber from "bignumber.js";

Vue.filter('short', function (value) {
  return value.slice(0, 4) + '...' + value.slice(-4);
});

Vue.filter('fixed', function (value) {
    return new BigNumber(value).shiftedBy(-9).toFixed(2);
})