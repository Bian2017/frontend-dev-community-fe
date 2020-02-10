<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <span @click="()=> {this.faceStatus = !this.faceStatus}" ref="face">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="()=> {this.imgStatus = !this.imgStatus}" ref="img">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span>
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
    <face :isShow="faceStatus" @closeEvent="()=>{this.faceStatus = false}" :ctrl="this.$refs.face"></face>
    <img-upload
      :isShow="imgStatus"
      @closeEvent="()=>{this.imgStatus = false}"
      :ctrl="this.$refs.img"
    ></img-upload>
  </div>
</template>

<script>
import Face from "./Face.vue";
import ImgUpload from "./ImgUpload.vue";

export default {
  name: "Editor",
  components: {
    Face,
    ImgUpload
  },
  data() {
    return {
      faceStatus: false,
      imgStatus: false
    };
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
