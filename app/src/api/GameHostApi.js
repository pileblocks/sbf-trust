export const gameHostApi = {
    getCurrentGameId: async function (hostAccount) {
        let result = await hostAccount.runLocal("currentGameId", {});
        return parseInt(result.decoded.output.currentGameId);
    },
    getGameIndexAddress: async function (hostAccount, gameId) {
        let result = await hostAccount.runLocal("getIndexAddress", {_gameId: gameId});
        return result.decoded.output._indexAddress;
    },
    getCurrentGameAddress: async function (hostAccount) {
        let result = await hostAccount.runLocal("getGameAddress", {});
        return result.decoded.output._gameAddress;
    },

}