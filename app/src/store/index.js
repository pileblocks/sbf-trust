import Vue from 'vue'
import Vuex from 'vuex'
import {Game} from "@/store/Game";
import {Player} from "@/store/Player";
import {Wallet} from "@/store/Wallet";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
      Game, Player, Wallet
  }
})
