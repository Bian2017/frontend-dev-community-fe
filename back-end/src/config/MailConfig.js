/**
 * 邮箱配置
 */
import nodemailer from 'nodemailer'

// 密码重置url
const RESET_URL = 'https://www.baidu.com'

async function send(sendInfo) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', // SMTP服务器域名
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'shimu_cumt_zju@foxmail.com', // 发件人的邮箱
      pass: 'hnqqqntdaoefjhii' // 邮箱授权码(QQ邮箱--> 账号 --> 开启POP3/SMTP)
    }
  })

  const info = await transporter.sendMail({
    from: '"邮件测试" <shimu_cumt_zju@foxmail.com>', // "发件人" <发送者邮箱>
    to: sendInfo.email, // 收件人
    // 邮件主题
    subject: sendInfo.user !== '' ? `${sendInfo.user}你好，密码重置连接` : '密码重置连接',
    // 邮件缩略的纯文本消息
    text: `您的邀请码是${sendInfo.code}，邀请码的过期时间是${sendInfo.expire}`,
    // 邮件正文(其实就是HTML页面)
    html: `
    <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
    <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">Node社区——欢迎来到官方社区</div>
    <div style="padding: 25px">
      <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${sendInfo.expire}之前重置您的密码：</div>
      <a href="${RESET_URL}" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">立即重置密码</a>
      <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
    </div>
    <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
    </div>`
  })

  return info.messageId
}

export default send
