import { RouterContext } from 'koa-router'


const base = async function(ctx: RouterContext){
  ctx.body = 'Hi TS'
}

export default base