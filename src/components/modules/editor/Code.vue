<template>
  <transition name="fade">
    <div class="layui-layer layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">请贴入代码或任意文本</div>
      <div class="layui-layer-content">
        <textarea
          id="inputItem"
          v-model="code"
          class="layui-layer-input"
          v-on:keydown.enter="$event.stopPropagation()"
          :style="{'width': this.width + 'px', 'height': this.height + 'px'}"
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
  name: "code",
  props: ["isShow", "width", "height"],
  data() {
    return {
      code: ""
    };
  },
  methods: {
    submit() {
      if (this.code === "") {
        document.getElementById("inputItem").focus();
        this.$pop("shake", "请输入引用内容");
        return;
      }
      this.$emit("addEvent", this.code);
      setTimeout(() => {
        this.code = "";
        this.$emit("closeEvent");
      }, 0);
    },
    cancel() {
      this.code = "";
      this.$emit("closeEvent");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
