import Router from 'koa-router'
import baseController from '../controller/api/base'

const router = new Router()

router.get('/app', baseController)

export default router
