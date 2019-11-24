const path = require("path")

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
        test: "/.js$/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            cacheDirectory: true
          }
        },
        exclude: /node_module/
      }
    ]
  }
}
