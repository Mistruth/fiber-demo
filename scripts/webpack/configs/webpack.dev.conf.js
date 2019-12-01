const merge = require('webpack-merge')
const webpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')

module.exports = merge(webpackConfig, {
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
