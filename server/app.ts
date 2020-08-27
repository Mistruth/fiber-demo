import Koa from 'koa'
import serve from 'koa-static'
import router from './router'
const app = new Koa()

app.use(router.routes())

// app.use(serve('./dist'))

app.listen(8080,() => {
  console.log('the server is running at localhost:8080')
})

