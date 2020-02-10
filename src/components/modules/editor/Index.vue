<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <span @click="()=> {this.faceStatus = !this.faceStatus}">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="()=> {this.imgStatus = !this.imgStatus}">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="()=> {this.linkStatus = !this.linkStatus}">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote">”</span>
          <span>
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span>hr</span>
          <span>
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea name="content" class="layui-textarea fly-editor"></textarea>
      </div>
    </div>
    <div ref="modal">
      <face :isShow="faceStatus" @closeEvent="()=>{this.faceStatus = false}"></face>
      <img-upload :isShow="imgStatus" @closeEvent="()=>{this.imgStatus = false}"></img-upload>
      <link-add :isShow="linkStatus" @closeEvent="()=>{this.linkStatus = false}"></link-add>
    </div>
  </div>
</template>

<script>
import Face from "./Face.vue";
import ImgUpload from "./ImgUpload.vue";
import LinkAdd from "./LinkAdd.vue";

export default {
  name: "Editor",
  components: {
    Face,
    ImgUpload,
    LinkAdd
  },
  data() {
    return {
      faceStatus: false,
      imgStatus: false,
      linkStatus: false
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
    // 触发隐藏本组件的关闭事件，改变isShow状态
    handleBodyClick(e) {
      // 防止事件冒泡
      e.stopPropagation();

      // 判断是否点击到非控制ICON以外 + 本组件 的地方
      if (
        !(
          this.$refs.icons.contains(e.target) ||
          this.$refs.modal.contains(e.target)
        )
      ) {
        this.faceStatus = false;
        this.imgStatus = false;
        this.linkStatus = false;
      }
    }
  }
};
</script>

<style lang="less">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

// transition组件需结合过渡的类名
.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.fly-editor {
  height: 260px;
}

.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}

.edit-wrap {
  position: relative;
}

.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
