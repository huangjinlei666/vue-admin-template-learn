'use strict'
const { defineConfig } = require('@vue/cli-service')
const path=require('path')
const resolve=dir=>path.join(__dirname,dir)
const defaultSettings=require('./src/settings.js')
const name=defaultSettings.title || 'Vue Admin Template'
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack:{
     name:name,
     resolve:{
      alias:{
        '@':resolve('src'),
      },
      fallback: {
        path: require.resolve("path-browserify"),
      },
     }
  },
  chainWebpack(config){
     // set svg-sprite-loader
    config.module
    .rule('svg')
    .exclude.add(resolve('src/icons'))
    .end()
  config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
    .end()
  },
  devServer:{
    port:9529,
    // host:'0.0.0.0',
    https:false,
    open:true,
    proxy:{
      '/api':{
        target:'http:12.3.42.4:5050/',
        pathRewrite:{
          '^/api':'',
        },
        changeOrigin:true,
      }
    }
  }
})
