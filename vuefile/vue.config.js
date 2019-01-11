var path = require('path')
var PrerenderSpaPlugin = require('prerender-spa-plugin')
module.exports = {
  assetsDir: 'vue',
  productionSourceMap: false,
  devServer: {
    port: 9210,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://wap.deviotek.com',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new PrerenderSpaPlugin({
        // 编译后的html需要存放的路径
        staticDir: path.join(__dirname, './dist'),
        // 列出哪些路由需要预渲染
        routes: [ '/', '/video/', '/find/', 
          '/video/total/', '/video/total-a1/' ,'/video/total-a2/', '/video/total-a3/' ,'/video/total-a4/', '/video/total-a5/',
          '/video/total-b1/' ,'/video/total-b2/', '/video/total-b3/', '/video/total-b4/', '/video/total-b5/', '/video/total-b6/',
          '/video/total-c1/' ,'/video/total-c2/',
          '/video/total-a1-b1/' ,'/video/total-a2-b1/', '/video/total-a3-b1/' ,'/video/total-a4-b1/', '/video/total-a5-b1/',
          '/video/total-a1-b2/' ,'/video/total-a2-b2/', '/video/total-a3-b2/' ,'/video/total-a4-b2/', '/video/total-a5-b2/',
          '/video/total-a1-b3/' ,'/video/total-a2-b3/', '/video/total-a3-b3/' ,'/video/total-a4-b3/', '/video/total-a5-b3/',
          '/video/total-a1-b4/' ,'/video/total-a2-b4/', '/video/total-a3-b4/' ,'/video/total-a4-b4/', '/video/total-a5-b4/',
          '/video/total-a1-b5/' ,'/video/total-a2-b5/', '/video/total-a3-b5/' ,'/video/total-a4-b5/', '/video/total-a5-b5/',
          '/video/total-a1-b6/' ,'/video/total-a2-b6/', '/video/total-a3-b6/' ,'/video/total-a4-b6/', '/video/total-a5-b6/',
          '/video/total-a1-c1/' ,'/video/total-a2-c1/', 
          '/video/total-a1-c2/' ,'/video/total-a2-c2/', 
          '/video/total-a1-b1-c1/' ,'/video/total-a2-b1-c1/', 
          '/video/total-a1-b2-c2/' ,'/video/total-a2-b2-c2/', 
          '/video/total-a1-b3-c1/' ,'/video/total-a2-b3-c1/', 
          '/video/total-a1-b4-c2/' ,'/video/total-a2-b4-c2/', 
          '/video/total-a1-b5-c1/' ,'/video/total-a2-b5-c1/', 
          '/video/total-a1-b6-c2/' ,'/video/total-a2-b6-c2/', 
          '/video/play-1.htm/', '/video/play-2.htm/', '/video/play-3.htm/', '/video/play-4.htm/', '/video/play-5.htm/', '/video/play-6.htm/', 
          '/video/play-7.htm/', '/video/play-8.htm/', '/video/play-9.htm/', '/video/play-10.htm/', '/video/play-11.htm/', '/video/play-12.htm/', 
          '/video/play-13.htm/', '/video/play-14.htm/', '/video/play-15.htm/', '/video/play-16.htm/', '/video/play-17.htm/', '/video/play-18.htm/', 
          '/video/play-19.htm/', '/video/play-20.htm/', '/video/play-21.htm/', '/video/play-22.htm/', '/video/play-23.htm/', '/video/play-24.htm/'
        ],
        renderAfterElementExists : 'document.querySelector("#app")',
        renderAfterTime: 2000
      })
    ]
  }
}