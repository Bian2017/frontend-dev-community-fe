import Vue from "vue";
import VueRouter from "vue-router";
import jwt from "jsonwebtoken";
import moment from "moment";
import store from "@/store/index";

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
const MyPost = () =>
  import(/* webpackChunkName: 'my-post' */ "../components/user/posts/MyPost.vue");
const MyCollection = () =>
  import(/* webpackChunkName: 'my-collection' */ "../components/user/posts/MyCollection.vue");

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
    /**
     * 添加路由元信息，用来标注哪些路由是需要登录鉴权的。
     * 避免在全局路由守卫处需要一一排除不需要登录鉴权页面的。
     */
    meta: {
      requiresAuth: true
    },
    linkExactActiveClass: "layui-this",
    children: [
      {
        path: "",
        name: "center",
        component: UserCenter
      },
      {
        path: "settings",
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
        component: UserPosts,
        children: [
          {
            path: "",
            name: "mypost",
            component: MyPost
          },
          {
            path: "mycollection",
            name: "mycollection",
            component: MyCollection
          }
        ]
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

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  // 取localStorage里面缓存的token信息和用户信息
  const token = localStorage.getItem("token");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (token !== "" && token !== null) {
    const payload = jwt.decode(token);

    // 判断token是否过期
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit("setToken", token);
      store.commit("setUserInfo", userInfo);
      store.commit("setIsLogin", true);
    } else {
      localStorage.clear();
    }
  }

  // 查看是否有路由元信息，即是否需要鉴权认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const { isLogin } = store.state;

    if (isLogin) {
      next();
    } else {
      next("/login");
    }
  } else {
    // 公共用户页面，不需要用户登录
    next();
  }
});

export default router;
