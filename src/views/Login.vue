<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <validation-observer ref="observer" v-slot="{ validate }">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="username" class="layui-form-label">用户名</label>
                    <validation-provider name="username" rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          v-model="username"
                          placeholder="请输入邮箱"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <span class="error layui-form-mid">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>

                  <div class="layui-form-item">
                    <label for="password" class="layui-form-label">密码</label>
                    <validation-provider name="password" rules="required|min:6" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          placeholder="请输入密码"
                          class="layui-input"
                        />
                      </div>
                      <span class="error layui-form-mid">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>

                  <div class="layui-form-item">
                    <label for="code" class="layui-form-label">验证码</label>
                    <validation-provider name="code" rules="required|length:4" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          v-model="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                        <span class="error">{{ errors[0] }}</span>
                      </div>
                      <div class="layui-form-mid svg" v-html="svgCaptcha" @click="getCaptcha"></div>
                    </validation-provider>
                  </div>

                  <div class="layui-form-item">
                    <!-- 校验失败不会调用then方法 -->
                    <button class="layui-btn" type="button" @click="validate().then(doLogin)">立即登录</button>
                    <span style="padding-left:20px;">
                      <router-link :to="{ name: 'forget' }">忘记密码?</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uuid from "uuid/v4";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { getCaptchaAsync, loginAsync } from "@/services/login";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      code: "", // 验证码
      svgCaptcha: ""
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted() {
    // window.vue = this; // 如何在console窗口取到这个Vue组件
    let sid = "";
    if (localStorage.getItem("sid")) {
      sid = localStorage.getItem("sid");
    } else {
      // uuid: 通用唯一识别码，具有唯一性
      sid = uuid();
      localStorage.setItem("sid", sid);
    }

    this.$store.commit("setSid", sid);
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      const { sid } = this.$store.state;

      getCaptchaAsync(sid).then(res => {
        this.svgCaptcha = res;
      });
    },
    async doLogin() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        loginAsync({
          username: this.username,
          password: this.password,
          code: this.code,
          sid: this.$store.state.sid
        })
          .then(res => {
            this.$store.commit("setUserInfo", res);
            this.$store.commit("setIsLogin", true);
            this.username = "";
            this.password = "";
            this.code = "";

            requestAnimationFrame(() => {
              this.$refs.observer.reset();
            });
            this.$router.push({ name: "index" });
          })
          .catch(err => {
            const { msg, code } = err.data;

            if (`${code}` === "500") {
              // 利用服务端进行验证码校验(Server Side Validation)
              this.$refs.observer.setErrors({
                code: [msg]
              });
            } else {
              this.$alert(msg);
            }
          });
      }
    }
  }
};
</script>

<style>
.svg {
  position: relative;
  top: -20px;
}

.error {
  color: red;
}
</style>
