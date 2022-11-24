export const playerApi = {
    showPlayerStats: async function (playerAccount, farmTime) {
        let result = await playerAccount.runLocal("showPlayerStats", {farmTime: farmTime});
        return result.decoded.output.playerStats;
    }
}