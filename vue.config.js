const autoprefixer = require("autoprefixer");
const pxtoviewport = require("postcss-px-to-viewport");

module.exports = {
  outputDir: "dist",
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375,
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ["van-circle__layer"]
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://baobab.kaiyanapp.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
