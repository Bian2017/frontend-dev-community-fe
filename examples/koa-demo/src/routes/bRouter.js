const Router = require('koa-router')
const bController = require('../api/bController')

const router = new Router()

router.get('/b', bController)

module.exports = router
