<template>
  <div>
    <panel></panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";

export default {
  name: "home",
  components: {
    panel: Panel
  }
};
</script>

<style lang="less" scoped>
</style>
