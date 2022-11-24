import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { EverX } from "./api/EverX";
import {TonClient} from "@tonclient/core";
import { libWeb } from '@tonclient/lib-web';
import './AppFilters';
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false;
VueClipboard.config.autoSetContainer = true;

Vue.use(VueClipboard);
Vue.use(EverX);
TonClient.useBinaryLibrary(libWeb);
console.log("Network:" + process.env.VUE_APP_EVER_NODE_URL);
console.log("Host:" + process.env.VUE_APP_HOST_CONTRACT);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
