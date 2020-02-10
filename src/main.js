import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/utils/veevalidate";
import Alert from "./components/modules/alert";
import Pop from "./components/modules/pop";

/**
 * 通过全局方法`Vue.use()`使用插件，需在调用`new Vue()`启动应用之前完成。
 */
Vue.use(Alert);
Vue.use(Pop);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
