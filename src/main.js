import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import filters from "@/utils/filter";
import "@/utils/veevalidate";
import Alert from "./components/modules/alert";
import Pop from "./components/modules/pop";

/**
 * 通过全局方法`Vue.use()`使用插件，需在调用`new Vue()`启动应用之前完成。
 */
Vue.use(Alert);
Vue.use(Pop);

// 当有多个filters时，通过这种方式避免全局一一注册
Object.keys(filters).forEach(key => {
  // 通过这种方式可以全局使用filter
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
