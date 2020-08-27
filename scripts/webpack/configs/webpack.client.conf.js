const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const isProd = process.env.NODE_ENV === 'production'
const resolve = dir => path.resolve(__dirname, '../../../', dir)

module.exports = {
  entry: resolve('client'),
  output: {
    path: resolve('dist'),
    filename: 'js/client.bundle.[hash:8].js'
  },
  mode: isProd ? 'production' : 'development',
  devtool: 'cheap-source-map',
  resolve: {
    extensions: ['ts', 'tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx|ts|js|tsx?$/,
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
            plugins: [
              ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
            ],
            cacheDirectory: true
          }
        },
        exclude: /node_module/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html')
    }),
    new ManifestPlugin()
  ]
}
