import koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import json from 'koa-json' // 处理json格式
import statics from 'koa-static'
import helmet from 'koa-helmet'
import compose from 'koa-compose'
import compress from 'koa-compress'
import path from 'path'

const app = new koa() // 创建实例
const router = new Router()
const abRouter = require('./routes/routes')

const isDevMode = process.env.NODE_ENV === 'production' ? false : true

// 路径前缀
router.prefix('/api')

router.get('/', ctx => {
  ctx.body = 'hello koa'
})

router.get('/params', ctx => {
  const params = ctx.request.query

  ctx.body = {
    a: params.a,
    b: params.b
  }

  console.log('params:', params)
})

router.get('/async', async ctx => {
  const result = await new Promise(resolve => {
    setTimeout(function() {
      resolve('Hello aysnc 2s later')
    }, 2000)
  })

  ctx.body = result
})

router.post('/post', async ctx => {
  let { body } = ctx.request

  console.log('body:', body)

  ctx.body = {
    ...body
  }
})

/**
 * 使用koa-compose集成中间件
 */
const middleware = compose([
  // 中间件的处理是有顺序的，所以先处理request中的数据
  koaBody(),
  // 绝对路径
  statics(path.join(__dirname, './public')),
  // 处理跨域请求
  cors(),

  json({ pretty: false, param: 'pretty' }),
  helmet()
])

// 如果是开发模式，则压缩代码
if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(abRouter())

app
  // 将前面定义的路由里面的方法添加到app应用上，作为中间件进行处理
  .use(router.routes())
  // 拦截器，拦截应用中没有的请求，返回4xx错误或者5xx错误
  .use(router.allowedMethods())

app.listen(3001)
