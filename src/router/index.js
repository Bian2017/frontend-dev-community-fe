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
const UserCenter = () =>
  import(/* webpackChunkName: 'user-center' */ "../components/user/Center.vue");
const UserSettings = () =>
  import(/* webpackChunkName: 'user-settings' */ "../components/user/Settings.vue");
const UserPosts = () => import(/* webpackChunkName: 'user-posts' */ "../components/user/Posts.vue");
const UserMsg = () => import(/* webpackChunkName: 'user-msg' */ "../components/user/Msg.vue");
const UserOthers = () =>
  import(/* webpackChunkName: 'user-others' */ "../components/user/Others.vue");
const UserHome = () => import(/* webpackChunkName: 'user-others' */ "../views/UserHome.vue");
const MyInfo = () =>
  import(/* webpackChunkName: 'my-info' */ "../components/user/settings/MyInfo.vue");
const Accounts = () =>
  import(/* webpackChunkName: 'accounts' */ "../components/user/settings/Accounts.vue");
const Password = () =>
  import(/* webpackChunkName: 'password' */ "../components/user/settings/Password.vue");
const PicUpload = () =>
  import(/* webpackChunkName: 'pic-upload' */ "../components/user/settings/PicUpload.vue");

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
    path: "/user/:uid",
    name: "home",
    props: true,
    component: UserHome // 用户主页
  },
  {
    path: "/center",
    component: Center,
    linkExactActiveClass: "layui-this",
    children: [
      {
        path: "",
        name: "center",
        component: UserCenter
      },
      {
        path: "settings",
        name: "settings",
        component: UserSettings,
        children: [
          {
            path: "",
            name: "info",
            component: MyInfo
          },
          {
            path: "account",
            name: "account",
            component: Accounts
          },
          {
            path: "password",
            name: "password",
            component: Password
          },
          {
            path: "picupload",
            name: "picupload",
            component: PicUpload
          }
        ]
      },
      {
        path: "posts",
        name: "posts",
        component: UserPosts
      },
      {
        path: "msg",
        name: "msg",
        component: UserMsg
      },
      {
        path: "others",
        name: "others",
        component: UserOthers
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "layui-this", // 全局配置 <router-link> 默认的精确激活的 class
  routes
});

export default router;
