class DemoController {
  constructor() {}

  async demo(ctx) {
    ctx.body = {
      msg: 'body message!!!'
    }
  }
}

module.exports = new DemoController()
