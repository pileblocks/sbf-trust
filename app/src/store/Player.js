export const Player = {
  state: {
      isDepo: false,
      isJoined: false,
      farmingSpeed: 10,
      playerList: [],
      withdrawAmount: 0,
      earnedAmount: 0,
      farmingWallet: ""
  },
  namespaced: true,
  mutations: {
      updatePlayerList(state, playerList) {
            state.playerList = playerList;
      },
      updateJoined(state, newStatus) {
          state.isJoined = newStatus;
      },
      updateDepo(state, newStatus) {
          state.isDepo = newStatus;
      },
      updateWithdrawAmount(state, newValue) {
          state.withdrawAmount = newValue;
      },
      updateEarnedAmount(state, newValue) {
          state.earnedAmount = newValue;
      },
      updateFarmingWallet(state, newValue) {
          state.farmingWallet = newValue;
      },
      updateFarmingSpeed(state, newValue) {
          state.farmingSpeed = newValue;
      },
  },
  actions: {
      updateJoinedDepo({commit, state, rootState}) {
          let thisPlayer = state.playerList.find((item) => item.owner === rootState.Wallet.address);
          if (thisPlayer !== undefined) {
              commit("updateJoined", true);
              commit("updateFarmingWallet", thisPlayer.farmingWallet);
              commit("updateFarmingSpeed", thisPlayer.farmingSpeed);
              if (thisPlayer.balance > 0) {
                  commit("updateDepo", true);
                  commit("updateWithdrawAmount", thisPlayer.farmedTokens);
                  commit("updateEarnedAmount", thisPlayer.totalClaimed);
              } else {
                    commit("updateDepo", false);
              }
          }
          else {
              commit("updateJoined", false);
              commit("updateDepo", false);
          }
      }
  }
}
