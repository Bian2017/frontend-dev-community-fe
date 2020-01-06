/**
 * 作为安装插件的初始化文件
 */
import AlertComponent from "./Alert.vue";

const Alert = {};

/**
 * Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
 */
Alert.install = Vue => {
  /**
   * Vue.extend: 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
   * 创建构造器。
   */
  const AlertConstructor = Vue.extend(AlertComponent);

  // 创建实例
  const instance = new AlertConstructor();
  // 将实例挂载到元素上
  instance.$mount(document.createElement("div"));
  // 实例挂载之后，元素可以用vm.$el访问
  document.body.appendChild(instance.$el);

  // 添加实例方法
  Vue.prototype.$alert = msg => {
    instance.type = "alert";
    instance.msg = msg;
    instance.isShow = true;
  };

  Vue.prototype.$confirm = (msg, success, cancel) => {
    instance.type = "confirm";
    instance.msg = msg;
    instance.isShow = true;

    if (typeof success !== "undefined") {
      instance.success = success;
    }

    if (typeof cancel !== "undefined") {
      instance.cancel = cancel;
    }
  };
};

export default Alert;
