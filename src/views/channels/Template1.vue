<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <list></list>
      </div>
      <div class="layui-col-md4">
        <sidebar-hotlist></sidebar-hotlist>
        <sidebar-ads></sidebar-ads>
        <sidebar-links></sidebar-links>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/contents/List.vue";
import Ads from "@/components/sidebar/Ads.vue";
import HotList from "@/components/sidebar/HotList.vue";
import Links from "@/components/sidebar/Links.vue";

export default {
  name: "template1",
  components: {
    list: List,
    "sidebar-ads": Ads,
    "sidebar-hotlist": HotList,
    "sidebar-links": Links
  }
};
</script>

<style lang="less" scoped>
</style>
