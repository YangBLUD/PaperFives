const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, //关闭eslint检查
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve("path-browserify") },
    },
  },
  devServer:{
    proxy:{
      '/api':{
        target:'http://81.70.161.76:5000/api', 
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
            '^/api': ''
        }
      }
    }
  }
})