const path = require('path')
const nodeExternals = require('webpack-node-externals')
const resolve = dir => path.resolve(__dirname, '../../../', dir)

module.exports = {
  entry: resolve('server/app.ts'),

  output: {
    path: resolve('bundles'),
    filename: 'server.bundle.js'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  externals: [nodeExternals()],
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx|ts|tsx|js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: true
                  }
                }
              ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              // '@babel/plugin-proposal-class-properties',
              // [
              //   '@babel/plugin-transform-modules-commonjs',
              // ]
            ],
            cacheDirectory: true
          }
        },
        exclude: /node_module/
      },
      {
        test: /\.css?$/,
        use: {
          loader: 'ignore-loader'
        }
      }
    ]
  },
}