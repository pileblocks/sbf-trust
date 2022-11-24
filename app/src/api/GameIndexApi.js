export const gameIndexApi = {
    getGameAddress: async function (indexAccount) {
        let result = await indexAccount.runLocal("gameAddress", {});
        return result.decoded.output.gameAddress;
    }
}