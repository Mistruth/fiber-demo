process.env.NODE_ENV = 'development'

const webpackConfig = require('./configs/webpack.server.conf')
const webpack = require('webpack')

webpack(webpackConfig,(err, stats) => {
  if (err) throw err

    process.stdout.write(
      stats.toString({
        builtAt: true, // 添加构建日期和时间
        colors: true,
        modules: false,
        children: false,
        chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        chunkModules: false
      }) + '\n\n'
    )
})
