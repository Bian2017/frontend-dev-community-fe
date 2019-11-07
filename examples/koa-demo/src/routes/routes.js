import combineRoutes from 'koa-combine-routers' // 拼接路由
import publicRouter from './publicRouter'
import loginRouter from './loginRouter'

module.exports = combineRoutes(publicRouter, loginRouter)
