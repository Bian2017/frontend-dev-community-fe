import svgCaptcha from 'svg-captcha'

class PublicController {
  constructor() {}

  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({})

    ctx.body = {
      code: 0,
      data: newCaptcha.data
    }
  }
}

module.exports = new PublicController()
