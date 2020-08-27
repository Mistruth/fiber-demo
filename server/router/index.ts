import Router from 'koa-router'
import personInfoClr from '../controller/api/personInfo'

const router = new Router()

router.get('/api/personalInfo', personInfoClr)


export default router
