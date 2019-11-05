import Vue from 'vue'
import { ValidationProvider, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zhCN from 'vee-validate/dist/locale/zh_CN.json'
import App from './App.vue'
import router from './router'
import store from './store'

for (let i = 0; i < Object.keys(rules).length; i += 1) {
  const key = Object.keys(rules)[i]

  extend(key, { ...rules[key] })
}

localize('zh', zhCN)

// 全局注册
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
