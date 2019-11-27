const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const resolve = dir => path.resolve(__dirname, "../../../", dir)

module.exports = {
  entry: resolve("app"),
  output: {
    path: resolve("bundles")
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                {
                  corejs: 3,
                  modules: false,
                  useBuiltIns: "entry"
                }
              ],
              "@babel/preset-react"
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
            cacheDirectory: true
          }
        },
        exclude: /node_module/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("app/index.html")
    })
  ]
}
