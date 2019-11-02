import combineRoutes from 'koa-combine-routers' // 拼接路由
import demoRouter from './demoRouter'

const aRoutes = require('./aRouter')
const bRoutes = require('./bRouter')

module.exports = combineRoutes(aRoutes, bRoutes, demoRouter)
