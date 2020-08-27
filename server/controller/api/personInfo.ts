
import { RouterContext } from 'koa-router'

const personInfo = async function(ctx: RouterContext){
  
  ctx.body = JSON.stringify({
    haha: '2'
  })
}

export default personInfo