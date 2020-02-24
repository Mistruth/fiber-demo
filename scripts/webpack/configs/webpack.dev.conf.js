const merge = require('webpack-merge')
const webpackConfig = require('./webpack.client.conf')
const webpack = require('webpack')

module.exports = merge(webpackConfig, {
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
