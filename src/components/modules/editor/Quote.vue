<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">请输入引用内容</div>
      <div class="layui-layer-content">
        <textarea
          id="inputItem"
          v-model="quote"
          class="layui-layer-input"
          style="width: 300px; height: 100px"
        />
      </div>
      <span class="layui-layer-setwin" @click.stop="cancel()">
        <a href="javscript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "quote",
  props: ["isShow"],
  data() {
    return {
      quote: ""
    };
  },
  methods: {
    submit() {
      if (this.quote === "") {
        document.getElementById("inputItem").focus();
        this.$pop("shake", "请输入引用内容");
        return;
      }
      this.$emit("addEvent", this.quote);
      setTimeout(() => {
        this.quote = "";
        this.$emit("closeEvent");
      });
    },
    cancel() {
      this.quote = "";
      this.$emit("closeEvent");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
