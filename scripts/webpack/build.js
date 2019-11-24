process.env.NODE_ENV = "production"
process.env.TARGET = "app"

const rm = require("rimraf")
const path = require("path")
const webpack = require("webpack")
const ora = require("ora")
const spinner = ora("构建中")
const webpackBaseConf = require("./configs/webpack.base.conf")

spinner.start()

rm(path.join(__dirname, "../../", "bundles"), err => {
  if (err) throw err

  webpack(webpackBaseConf, (err, stats) => {
    spinner.stop()

    if (err) throw err
    process.stdout.write(
      stats.toString({
        builtAt: true, // 添加构建日期和时间
        colors: true,
        modules: false,
        children: false,
        chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        chunkModules: false
      }) + "\n\n"
    )

    if (stats.hasErrors()) {
      console.log(" Build failed with errors.\n")
      process.exit(1)
    }
  })
})
