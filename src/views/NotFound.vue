<template>
  <div class="layui-container flex">
    <img src="../assets/images/404.jpg" width="600px" alt />
    <p>找不到页面了</p>
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: "404"
};
</script>

<style lang="less" scoped>
.flex {
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

p {
  padding: 10px 0 15px 0;
  color: #ddd;
}
</style>
