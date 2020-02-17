<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../assets/images/logo.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/">
            <i class="iconfont icon-jiaoliu"></i>交流
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html">
            <i class="iconfont icon-iconmingxinganli"></i>案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="/" target="_blank">
            <i class="iconfont icon-ui"></i>框架
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <a class="iconfont icon-touxiang layui-hide-xs" href="../user/login.html"></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <!-- 扩大hover区域 -->
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <router-link class="fly-nav-avatar" :to="{name: 'center'}">
              <cite class="layui-hide-xs">{{userInfo.name}}</cite>
              <!-- <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i> -->
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'"
              >VIP{{userInfo.isVip}}</i>
              <img :src="'http://localhost:3001' + userInfo.pic" />
            </router-link>

            <!-- 下拉菜单 -->
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{'layui-show': isHover}"
            >
              <dd>
                <router-link :to="{name: 'info'}">
                  <i class="layui-icon layui-icon-set"></i>
                  基本设置
                </router-link>
              </dd>
              <dd>
                <router-link :to="{name: 'msg'}">
                  <i class="layui-icon layui-icon-notice"></i>
                  我的消息
                </router-link>
              </dd>
              <dd>
                <router-link :to="{name: 'home', params: {uid: userInfo._id}}">
                  <i class="layui-icon layui-icon-home"></i>
                  我的主页
                </router-link>
              </dd>

              <hr style="margin: 5px 0;" />
              <dd>
                <a href="javascript: void(0)" style="text-align: center;" @click="logout()">退出</a>
              </dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isHover: false,
      hoverCtrl: {}
    };
  },
  computed: {
    isShow() {
      return this.$store.state.isLogin;
    },
    userInfo() {
      return (
        this.$store.state.userInfo || {
          name: "",
          pic: "",
          isVip: 0
        }
      );
    }
  },
  methods: {
    show() {
      // 当用户的鼠标移入头像的时候，显示下拉菜单
      clearInterval(this.hoverCtrl);
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true;
      }, 200);
    },
    logout() {
      // 因为token是无状态的，服务端不会存储token，所以只需本地清除token，即可实现退出功能
      this.$confirm(
        "确定退出吗?",
        () => {
          localStorage.clear();

          this.$store.commit("setToken", "");
          this.$store.commit("setUserInfo", "");
          this.$store.commit("setIsLogin", false);
          // 添加回调，是解决报错“路由导航重复”
          this.$router.push("/", () => {});
        },
        () => {}
      );
    },
    hide() {
      /**
       * 当用户的鼠标移出头像的时候，隐藏操作菜单。
       *
       * 注意：通过延迟操作以及扩大hover区域来解决下拉菜单消失的问题！！！
       */
      clearInterval(this.hoverCtrl);
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true;
      }, 500);
    }
  }
};
</script>

<style>
</style>
