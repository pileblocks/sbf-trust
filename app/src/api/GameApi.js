export const gameApi = {
    getFarmingHash: async function (gameAccount) {
        let result = await gameAccount.runLocal("getFarmingHash", {});
        return result.decoded.output._farmingHash.padStart(64, '0');
    },
    getInfo: async function (gameAccount) {

        let result = await gameAccount.runLocal("getInfo", {});
        return {
          "gameStartTime": parseInt(result.decoded.output.value0.gameStartTime),
          "gameId": parseInt(result.decoded.output.value0.gameId),
          "gameHost": result.decoded.output.value0.gameHost,
          "status": parseInt(result.decoded.output.value0.status),
          "gamePot": parseInt(result.decoded.output.value0.gamePot),
          "errorRate": parseInt(result.decoded.output.value0.errorRate),
          "gameCompleted": parseInt(result.decoded.output.value0.gameCompleted),
          "initialBalance": parseInt(result.decoded.output.value0.initialBalance)
        }
    },
}