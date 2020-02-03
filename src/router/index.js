import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/Home.vue");

/**
 * 懒加载
 *
 * 在注释中提供 webpackChunkName，这样将拆分出来的 bundle 命名为 [name].bundle.js，而不是 [id].bundle.js
 */
const Login = () => import(/* webpackChunkName: 'login' */ "../views/Login.vue");
const Reg = () => import(/* webpackChunkName: 'reg' */ "../views/Reg.vue");
const Forget = () => import(/* webpackChunkName: 'forget' */ "../views/Forget.vue");
const Index = () => import(/* webpackChunkName: 'index' */ "../views/channels/Index.vue");
const Template1 = () =>
  import(/* webpackChunkName: 'template1' */ "../views/channels/Template1.vue");
const Center = () => import(/* webpackChunkName: 'center' */ "../views/Center.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        name: "index",
        component: Index
      },
      {
        path: "/index/:catalog",
        name: "catalog",
        component: Template1
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/reg",
    name: "reg",
    component: Reg,
    // 添加路由守卫，防止当前页面无sid
    beforeEnter: (to, from, next) => {
      if (from.name === "login") {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/forget",
    name: "forget",
    component: Forget
  },
  {
    path: "/center",
    name: "center",
    component: Center
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "layui-this", // 全局配置 <router-link> 默认的精确激活的 class
  routes
});

export default router;
