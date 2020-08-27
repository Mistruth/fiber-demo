process.env.NODE_ENV = 'development'

const webpackDevConf = require('./configs/webpack.dev.conf')
const DevServer = require('webpack-dev-server')
const webpack = require('webpack')
const CONFIG = require('./config')

const { host, port, hot } = CONFIG

var compiler = webpack(webpackDevConf)

const server = new DevServer(compiler, {
  disableHostCheck: true,
  hot,
  stats: 'errors-only',
  proxy: {
    '/api': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
    }
  }
})

server.listen({ host, port })
