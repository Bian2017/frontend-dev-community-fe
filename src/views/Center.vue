<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li class="layui-nav-item" v-for="(item, index) in lists" :key="'center'+ index">
        <router-link :to="{name: item.link}">
          <i class="iconfe" :class="item.icon"></i>
          {{item.name}}
        </router-link>
      </li>
      <router-view></router-view>
    </ul>
  </div>
</template>

<script>
export default {
  name: "center",
  data() {
    return {
      lists: [
        {
          name: "我的主页",
          icon: "icon-home",
          link: "home"
        },
        {
          name: "用户中心",
          icon: "icon-user",
          link: "center" // 采用的路由name，而没采用路由path。这样方便随时可以修改路由path，这样无需修改name
        },
        {
          name: "基本设置",
          icon: "icon-Settingscontroloptions",
          link: "settings"
        },
        {
          name: "我的帖子",
          icon: "icon-wendang",
          link: "posts"
        },
        {
          name: "我的消息",
          icon: "icon-message",
          link: "msg"
        },
        {
          name: "其他设置",
          icon: "icon-Products",
          link: "others"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import "../assets/custom/iconfont.css";

.iconfe {
  margin-right: 10px;
}
</style>
