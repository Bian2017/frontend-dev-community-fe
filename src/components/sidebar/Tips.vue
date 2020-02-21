<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main">
      <ul class="layui-clear quick-channel">
        <li class="layui-col-xs6" v-for="(item, index) in lists" :key="'tips' + index">
          <a :href="item.link" target="_blank">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTips } from "@/services/content";

export default {
  name: "tips",
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    getTips()
      .then(res => {
        this.lists = res.data;
      })
      .catch(err => {
        if (err && err.data) {
          this.$alert(err.data.msg);
        } else {
          this.$alert(err);
        }
      });
  }
};
</script>

<style lang="less" scoped>
@border-color: #f2f2f2;

.fly-panel-main {
  padding: 15px;
}

.quick-channel {
  border: 1px solid @border-color;
  border-bottom: none;
  border-right: none;

  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid @border-color;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-left: none;
    border-top: none;

    // 设置成block，撑大可点选区域
    a {
      display: block;
    }
  }
}
</style>
