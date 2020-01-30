<template>
  <div>
    <panel></panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <list></list>
        </div>
        <div class="layui-col-md4">
          <sidebar-tips></sidebar-tips>
          <sidebar-sign></sidebar-sign>
          <sidebar-hotlist></sidebar-hotlist>
          <sidebar-ads></sidebar-ads>
          <sidebar-links></sidebar-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";
import List from "@/components/contents/List.vue";
import Tips from "@/components/sidebar/Tips.vue";
import Ads from "@/components/sidebar/Ads.vue";
import HotList from "@/components/sidebar/HotList.vue";
import Links from "@/components/sidebar/Links.vue";
import Sign from "@/components/sidebar/Sign.vue";

export default {
  name: "home",
  components: {
    panel: Panel,
    list: List,
    "sidebar-tips": Tips,
    "sidebar-ads": Ads,
    "sidebar-hotlist": HotList,
    "sidebar-links": Links,
    "sidebar-sign": Sign
  }
};
</script>

<style lang="less" scoped>
</style>
