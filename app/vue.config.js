const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
  config.module
    .rule('wasm')
    .test(new RegExp('\.wasm'))
    .use('wasm-loader')
      .loader('wasm-loader')
      .end()
}
})
