import { extend, localize } from "vee-validate";
import { required, email, min, max, length, confirmed } from "vee-validate/dist/rules";
import zhCN from "vee-validate/dist/locale/zh_CN.json";

extend("required", required);
extend("email", email);
extend("min", min);
extend("max", max);
extend("length", length);
extend("confirmed", confirmed);

localize("zh_CN", {
  messages: {
    ...zhCN.messages,
    required: "请输入{_field_}"
  },
  names: {
    email: "邮箱",
    password: "密码",
    nickname: "昵称",
    username: "用户名",
    verificationCode: "验证码"
  },
  // 可以针对不同的规则name设定自定义消息
  fields: {
    // 针对email属性自定义规则
    email: {
      // 针对规则的message覆盖上面的全局定义消息
      email: "请输入正确的{_field_}"
    }
  }
});
