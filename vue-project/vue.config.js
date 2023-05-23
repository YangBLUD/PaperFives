const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, //关闭eslint检查
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve("path-browserify") },
    },
  },
})
