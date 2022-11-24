export const Wallet = {
  state: {
      address: "",
      isInstalled: false,
      walletProvider: null
  },
  namespaced: true,
  mutations: {
      updateIsInstalled(state, newIsInstalled) {
            state.isInstalled = newIsInstalled;
      },
      updateAddress(state, newAddress) {
            state.address = newAddress;
      },
      updateWalletProvider(state, newProvider) {
            state.walletProvider = newProvider;
      }

  }
}
