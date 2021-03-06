import { extend, localize } from "vee-validate";
// eslint-disable-next-line camelcase
import { required, email, min, max, length, confirmed, is_not } from "vee-validate/dist/rules";
import zhCN from "vee-validate/dist/locale/zh_CN.json";

extend("required", required);
extend("email", email);
extend("min", min);
extend("max", max);
extend("length", length);
extend("confirmed", confirmed);
extend("is_not", is_not);

localize("zh_CN", {
  messages: {
    ...zhCN.messages,
    required: "请输入{_field_}"
  },
  names: {
    email: "邮箱",
    password: "密码",
    name: "昵称",
    username: "用户名",
    code: "验证码",
    title: "标题",
    catalog: "分类"
  },
  // 可以针对不同的规则name设定自定义消息
  fields: {
    catalog: {
      is_not: "请选择{_field_}"
    },
    // 针对email属性自定义规则
    email: {
      // 针对规则的message覆盖上面的全局定义消息
      email: "请输入正确的{_field_}"
    },
    password: {
      confirmed: "前后两次密码请保持一致"
    }
  }
});
