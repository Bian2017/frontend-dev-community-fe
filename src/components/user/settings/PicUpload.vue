<template>
  <div>
    <div class="layui-form layui-form-pane layui-tab-item layui-show">
      <div class="layui-form-item">
        <div class="avatar-add">
          <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
          <label for="pic" type="button" class="layui-btn upload-img">
            <i class="layui-icon">&#xe67c;</i>上传头像
          </label>
          <!-- accept指定接收的类型 -->
          <input
            id="pic"
            type="file"
            name="file"
            accept="image/png, image/gif, image/jpg"
            @change="upload"
          />
          <img :src="pic" />
          <span class="loading"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from "@/services/content";
import config from "@/config";
import { updateUserInfo } from "@/services/user";

export default {
  name: "pic-upload",
  data() {
    return {
      pic:
        typeof this.$store.state.userInfo.pic !== "undefined"
          ? this.$store.state.userInfo.pic
          : "/img/avatar.jpg",
      formData: ""
    };
  },
  methods: {
    upload(e) {
      console.log("e", e);
      const file = e.target.files;
      const formData = new FormData();

      if (file.length > 0) {
        formData.append("file", file[0]);
        this.formData = formData;
      }

      uploadImg(this.formData).then(res => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? config.baseUrl.pro
            : config.baseUrl.dev;

        this.pic = baseUrl + res.data;

        updateUserInfo({
          pic: this.pic
        }).then(() => {
          // 修改全局的store内的用户基础信息
          const user = this.$store.state.userInfo;
          user.pic = this.pic;
          this.$store.commit("setUserInfo", user);
          this.$alert("图片上传成功");
        });

        // 如果用户再次点击上传按钮，需将上传按钮里面的值先置为空，相当于恢复初始状态
        document.getElementById("pic").value = "";
      });
    }
  }
};
</script>

<style lang="less" scoped>
#pic {
  display: none;
}
</style>
