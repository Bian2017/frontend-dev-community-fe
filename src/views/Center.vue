<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li class="layui-nav-item" v-for="(item, index) in lists" :key="'center'+ index">
        <a href="javascript:;">
          <i class="iconfe" :class="item.icon"></i>
          {{item.name}}
        </a>
      </li>
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
          icon: "icon-home"
        },
        {
          name: "基本设置",
          icon: "icon-Settingscontroloptions"
        },
        {
          name: "我的帖子",
          icon: "icon-wendang"
        },
        {
          name: "我的消息",
          icon: "icon-message"
        },
        {
          name: "其他设置",
          icon: "icon-Products"
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
