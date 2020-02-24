const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => path.resolve(__dirname, '../../../', dir)

module.exports = {
  entry: resolve('client'),
  output: {
    path: resolve('bundles'),
    filename: 'client.bundle'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.jsx|tsx|js|ts?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: 3,
                  modules: false,
                  useBuiltIns: 'entry'
                }
              ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            // plugins: [
            //   // '@babel/plugin-proposal-class-properties',
            //   [
            //     '@babel/plugin-transform-react-jsx',
            //   ]
            // ],
            cacheDirectory: true
          }
        },
        exclude: /node_module/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html')
    })
  ]
}
