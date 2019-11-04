import combineRoutes from 'koa-combine-routers' // 拼接路由
import publicRouter from './publicRouter'

module.exports = combineRoutes(publicRouter)
