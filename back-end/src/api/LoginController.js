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
}

export default new LoginController();
