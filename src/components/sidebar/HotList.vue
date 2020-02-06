<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in lists" :key="'hotlist'+ index">
        <a href="jie/detail.html">{{item.title}}</a>
        <span>
          <i class="iconfont icon-pinglun1"></i>
          {{item.answer}}
        </span>
      </dd>

      <!-- 无数据时 -->
      <!--
        <div class="fly-none">没有相关数据</div>
      -->
    </dl>
  </div>
</template>

<script>
import { getTop } from "@/services/content";

export default {
  name: "hotlist",
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    getTop().then(res => {
      this.lists = res.data;
    });
  }
};
</script>

<style lang="stylus" scoped></style>
