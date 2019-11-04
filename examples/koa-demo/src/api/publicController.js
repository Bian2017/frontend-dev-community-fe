import svgCaptcha from 'svg-captcha'

class PublicController {
  constructor() {}

  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1li',
      color: true,
      noise: Math.floor(Math.random() * 5), // 随机产生干扰线条
      width: 150,
      height: 50
    })

    ctx.body = {
      code: 0,
      data: newCaptcha.data
    }
  }
}

module.exports = new PublicController()
