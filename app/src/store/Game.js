import {GAME_ACTIVE} from "@/AppConst";

export const Game = {
  state: {
      gameStartTime: 0,
      gameId: 1,
      status: GAME_ACTIVE,
      gamePot: 0,
      errorRate: 0,
      gameCompleted: 0,
      initialBalance: 0,
      balance: 0,
      account: null,
      computedStatus: "ACTIVE",
      isLoading: false,
      provider: null
  },
  namespaced: true,

  mutations: {
      updateGameInfo(state, gameInfo) {
          state.gameId = gameInfo.gameId;
          state.gameStartTime = gameInfo.gameStartTime;
          state.status = gameInfo.status;
          state.gamePot = gameInfo.gamePot;
          state.errorRate = gameInfo.errorRate;
          state.gameCompleted = gameInfo.gameCompleted;
          state.initialBalance = gameInfo.initialBalance;
      },
      updateBalance(state, newBalance) {
          state.balance = newBalance;
      },
      updateStatus(state, newStatus) {
          state.status = newStatus;
      },
      updateAccount(state, newAccount) {
          state.account = newAccount;
      },
      updateLastId(state, newLastId) {
          state.lastId = newLastId;
      },
      updateComputedStatus(state, newComputedStatus) {
          state.computedStatus = newComputedStatus;
      },
      updateIsLoading(state, newLoading) {
          state.isLoading = newLoading;
      },
      updateProvider(state, newProvider) {
          state.provider = newProvider;
      },
  },
    getters: {
         gameComputedStatus: (state) => () => {
             if (state.gameStartTime === 0) {
                 return "PENDING"
             }

            if (state.gameStartTime > Date.now() / 1000) {
                return "PENDING";
            }

            if (Date.now() / 1000 > state.gameStartTime + 30 * 60) {
                return "COMPLETED";
            }
            return state.status === GAME_ACTIVE ? "ACTIVE" : "COMPLETED";
        }
    }
}
