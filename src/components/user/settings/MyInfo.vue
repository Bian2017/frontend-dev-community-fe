<template>
  <div>
    <div class="layui-form layui-form-pane layui-tab-item layui-show">
      <validation-observer ref="observer" v-slot="{ validate }">
        <div class="layui-form-item">
          <validation-provider name="email" rules="required|email" v-slot="{errors}">
            <label for="L_email" class="layui-form-label">邮箱</label>
            <div class="layui-input-inline">
              <input type="text" name="email" class="layui-input" v-model="username" />
            </div>
            <div class="layui-form-mid layui-word-aux">
              如果您在邮箱已激活的情况下，变更了邮箱，需
              <a
                href="activate.html"
                style="font-size: 12px; color: #4f99cf;"
              >重新验证邮箱</a>。
            </div>
            <div class="layui-form-mid">
              <span style="color: #c00">{{errors[0]}}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider name="name" rules="required" v-slot="{errors}">
            <label for="L_username" class="layui-form-label">昵称</label>
            <div class="layui-input-inline">
              <input type="text" name="name" class="layui-input" v-model="name" />
            </div>
            <div class="layui-form-mid">
              <span style="color: #c00">{{errors[0]}}</span>
            </div>
          </validation-provider>
        </div>

        <div class="layui-form-item">
          <label for="L_city" class="layui-form-label">城市</label>
          <div class="layui-input-inline">
            <input type="text" id="L_city" name="city" class="layui-input" v-model="location" />
          </div>
        </div>

        <div class="layui-form-item">
          <label for="sex" class="layui-form-label">性别</label>
          <div class="layui-input-inline gray mt10 ml10">
            <label for="gender1" class="mr10">
              <input id="gender1" v-model="gender" type="radio" name="sex" value="0" title="男" />
              <i class="layui-icon layui-icon-circle" :class="{'layui-icon-radio': gender === '0'}"></i>男
            </label>
            <label for="gender2">
              <input id="gender2" v-model="gender" type="radio" name="sex" value="1" title="女" />
              <i class="layui-icon layui-icon-circle" :class="{'layui-icon-radio': gender === '1'}"></i>
              女
            </label>
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label for="L_sign" class="layui-form-label">签名</label>
          <div class="layui-input-block">
            <textarea
              placeholder="随便写些什么刷下存在感"
              class="layui-textarea"
              style="height: 80px;"
              v-model="regmark"
            ></textarea>
          </div>
        </div>

        <div class="layui-form-item">
          <button class="layui-btn" @click="validate().then(submit)">确认修改</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { updateUserInfo } from "@/services/user";

export default {
  name: "my-info",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      username: "",
      name: "",
      location: "",
      regmark: "",
      gender: ""
    };
  },
  mounted() {
    const {
      username,
      name,
      location,
      gender,
      regmark
    } = this.$store.state.userInfo;

    this.username = username || "";
    this.name = name || "";
    this.location = location || "";
    this.gender = gender || "";
    this.regmark = regmark || "";
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();

      if (!isValid) {
        console.log("isValid:", isValid);
        return;
      }

      updateUserInfo({
        username: this.username,
        name: this.name,
        location: this.location,
        gender: this.gender,
        regmark: this.regmark
      }).then(() => {
        this.$store.commit("setUserInfo", {
          ...this.$store.state.userInfo,
          ...{
            username: this.username,
            name: this.name,
            location: this.location,
            gender: this.gender,
            regmark: this.regmark
          }
        });
        this.$alert("更新成功");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.layui-icon-radio {
  color: #5fb878;
}
</style>
