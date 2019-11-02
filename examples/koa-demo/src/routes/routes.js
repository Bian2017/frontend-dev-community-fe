import combineRoutes from 'koa-combine-routers' // 拼接路由
import aRouter from './aRouter'
import bRouter from './bRouter'
import demoRouter from './demoRouter'

module.exports = combineRoutes(aRouter, bRouter, demoRouter)
