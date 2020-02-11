<template>
  <transition name="fade">
    <div class="layui-layer layui-layer-page layui-layer-border edit-content" v-show="isShow">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label for="fileInput" class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                type="text"
                id="fileInput"
                placeholder="粘贴图片地址或者点击上传"
                class="layui-input"
                v-model="pic"
              />
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input
              id="uploadImg"
              type="file"
              name="file"
              accept="image/png, image/gif, image/jpg"
              class="layui-upload-file"
              @change="upload"
            />
          </li>
          <li class="layui-form-item">
            <button type="button" class="layui-btn" @click="submit()">确认</button>
          </li>
        </ul>
      </div>
      <div class="layui-layer-setwin" @click.stop="close()">
        <a href="javscript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </div>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from "@/services/content";
import config from "@/config";

export default {
  name: "ImgUpload",
  props: ["isShow"],
  data() {
    return {
      pic: "", // 上传的图片
      formData: "" // 上传图片的数据
    };
  },

  methods: {
    close() {
      this.$emit("closeEvent");
      // 清空输入内容，以及选择的文件
      this.pic = "";
      this.formData = "";
    },
    upload(e) {
      const file = e.target.files;
      const formData = new FormData();

      if (file.length > 0) {
        formData.append("file", file[0]);
        this.formData = formData;
      }
      // 上传图片
      uploadImg(this.formData).then(res => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? config.baseUrl.pro
            : config.baseUrl.dev;

        this.pic = baseUrl + res.data;
        // 清空上传图片中的内容
        document.getElementById("uploadImg").value = "";
      });
    },
    submit() {
      if (this.pic === "") {
        document.getElementById("fileInput").focus();
        this.$pop("shake", "请上传图片或者复制图片链接");
        return;
      }
      this.$emit("addEvent", this.pic);

      // 清空数据，恢复初始状态
      setTimeout(() => {
        this.pic = "";
        this.formData = "";
        this.$emit("closeEvent");
      }, 0); // 延时时间0表示当执行完submit函数之后，再立即执行数据清空
    }
  }
};
</script>

<style lang="less" scoped>
.layui-form-pane {
  margin: 20px;
}

.layui-form-item {
  text-align: center;
}
</style>
