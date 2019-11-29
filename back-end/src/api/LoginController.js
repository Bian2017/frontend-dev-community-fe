import send from '@/config/MailConfig';
import moment from 'moment';

class LoginController {
  constructor() {}

  async forget(ctx) {
    const { body } = ctx.request;

    try {
      const result = await send({
        code: '1234', // 验证码
        // 30分钟过期
        expire: moment()
          .add(30, 'm')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: body.username, // 用户邮箱
        user: 'shimu' // 用户昵称
      });

      ctx.body = {
        code: 0,
        data: result,
        msg: '邮件发送成功'
      };
    } catch (e) {
      console.log('e:', e);
    }
  }

  /**
   * 登录：
   * + 接收用户数据；
   * + 验证图片验证码的时效性、正确性
   * + 验证用户账号、密码是否正确
   * + 返回token
   *
   * @param {*} ctx
   */
  async login(ctx) {}
}

export default new LoginController();
