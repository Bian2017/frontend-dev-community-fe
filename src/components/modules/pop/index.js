/**
 * 注册消息气泡组件
 */
import PopComponent from "./Pop.vue";

const Pop = {};

// 注册组件
Pop.install = Vue => {
  const PopConstructor = Vue.extend(PopComponent);
  const instance = new PopConstructor();

  instance.$mount(document.createElement("div"));
  // 绑定instance上的element
  document.body.appendChild(instance.$el);

  // 添加实例方法，以供全局进行调用
  Vue.prototype.$pop = (type, msg) => {
    instance.type = type;
    instance.msg = msg;
    instance.isShow = true;
  };
};

export default Pop;
