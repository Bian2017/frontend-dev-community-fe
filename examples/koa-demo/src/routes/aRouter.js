const Router = require('koa-router')
const aController = require('../api/aController')

const router = new Router()

router.get('/a', aController)

module.exports = router
