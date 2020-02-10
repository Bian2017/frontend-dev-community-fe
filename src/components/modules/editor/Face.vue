<template>
  <!-- 利用vue提供的transition组件，给当前组件添加进入/离开过渡 -->
  <transition name="fade">
    <div class="layui-layer layui-layer-tips layui-edit-face edit-content" v-show="isShow">
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
  props: ["isShow", "ctrl"],
  data() {
    return {
      lists: faces
    };
  },
  mounted() {
    // nextTick: 将回调延迟到下次DOM更新循环之后执行
    this.$nextTick(() => {
      /**
       * 当点击face以外的地方时，需隐藏face。利用事件冒泡的原理，
       * 当我们vue组件下次去进行页面元素刷新的时候，去判断下
       * 有没有点击face以外的内容。如果点击，则隐藏face
       */
      document
        .querySelector("body")
        .addEventListener("click", this.handleBodyClick);
    });
  },
  beforeDestroy() {
    // 由于组件不停的创建或销毁，会导致重复添加监听事件，故此处需移除事件
    document
      .querySelector("body")
      .removeEventListener("click", this.handleBodyClick);
  },
  methods: {
    handleFaceClick(item) {
      this.$emit("addEvent", item);
    },
    // 触发隐藏本组件的关闭事件，改变isShow状态
    handleBodyClick(e) {
      // 防止事件冒泡
      e.stopPropagation();
      if (typeof this.ctrl === "undefined") {
        return;
      }

      // 判断是否点击富文本框的表情
      if (!this.ctrl.contains(e.target)) {
        // 判断是否点击到非控制Icon以为的地方
        this.$emit("closeEvent");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
