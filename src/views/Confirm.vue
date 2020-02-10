<template>
  <div class="layui-container flex">
    <div class="layui-row font pb30">确定更新账号为："{{username}}"吗？</div>
    <div class="layui-row">
      <button
        type="button"
        class="layui-btn"
        :class="{'layui-btn-disabled': isSend}"
        @click="submit()"
      >更新账号</button>
      <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from "@/services/user";

let obj = {};
export default {
  name: "confirm",
  data() {
    return {
      username: "",
      isSend: false
    };
  },
  mounted() {
    // 将一直到问号的内容全部进行替换
    const queryStr = window.location.href.replace(/.*\?/, "");
    // 先将一维数组转换为二维数组，再利用Object.fromEntries将二维数组列表转换成对象
    obj = Object.fromEntries(queryStr.split("&").map(v => v.split("=")));
    this.username = decodeURIComponent(obj.username);
  },
  methods: {
    submit() {
      obj.username = this.username;
      updateUsername(obj).then(res => {
        this.$alert(res.msg);
        this.isSend = true;

        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.font {
  font-size: 16px;
  color: #333;
}
</style>
