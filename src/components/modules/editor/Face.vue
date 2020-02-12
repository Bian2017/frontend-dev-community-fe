<template>
  <!-- 利用vue提供的transition组件，给当前组件添加进入/离开过渡 -->
  <transition name="fade">
    <div class="layui-layer-tips layui-edit-face edit-content" v-show="isShow">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <!-- v-for可以遍历对象 -->
          <li v-for="(value, key) in lists" :key="key" @click="handleFaceClick(key)">
            <img :src="value" alt="表情" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from "@/assets/js/face";

export default {
  name: "Face",
  props: ["isShow"],
  data() {
    return {
      lists: faces
    };
  },
  methods: {
    handleFaceClick(item) {
      this.$emit("addEvent", item);
      this.$emit("closeEvent");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
