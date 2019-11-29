import Router from 'koa-router'
import publicController from '../api/PublicController'

const router = new Router()

router.get('/captcha', publicController.getCaptcha)

export default router
