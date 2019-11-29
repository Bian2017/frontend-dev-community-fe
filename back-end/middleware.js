/**
 * Koa 工作原理
 *
 *
 */
const Koa = require('koa')
const app = new Koa()

/**
 * Koa 洋葱模型验证
 */
const middleware = function async(ctx, next) {
  console.log('this is a middleware')
  // next()
  console.log('this is a middleware end')
}

const middleware2 = function async(ctx, next) {
  console.log('this is a middleware2')
  next()
  console.log('this is a middleware2 end')
}
const middleware3 = function async(ctx, next) {
  console.log('this is a middleware3')
  next()
  console.log('this is a middleware3 end')
}

app.use(middleware2)
app.use(middleware3)
app.use(middleware)

app.listen(3000)
