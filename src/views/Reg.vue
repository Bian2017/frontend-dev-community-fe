<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登录</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <validation-observer ref="observer" v-slot="{ validate }">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="username" class="layui-form-label">用户名</label>
                    <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
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
                      <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <label class="layui-form-label">昵称</label>
                    <ValidationProvider
                      name="name"
                      rules="required|min:6|max:16"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="name"
                          name="name"
                          v-model="name"
                          placeholder="请输入昵称"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      <span class="error layui-form-mid">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <label class="layui-form-label">密码</label>
                    <ValidationProvider
                      name="password"
                      rules="required|min:6|max:16|confirmed:confirmation"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          placeholder="请输入密码"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      <span class="error layui-form-mid">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <label class="layui-form-label">确认密码</label>
                    <!-- 通过vid字段要校验的表单项-->
                    <ValidationProvider
                      name="password"
                      rules="required|min:6|max:16"
                      v-slot="{ errors }"
                      vid="confirmation"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="rePassword"
                          placeholder="请输入密码"
                          class="layui-input"
                        />
                      </div>
                      <span class="error layui-form-mid">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <label for="code" class="layui-form-label">验证码</label>
                    <ValidationProvider name="code" rules="required|length:4" v-slot="{ errors }">
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
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(doRegister)"
                    >立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { getCaptchaAsync, registerAsync } from "@/services/login";

export default {
  name: "register",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      username: "", // 用户名
      name: "", // 昵称
      password: "",
      rePassword: "", // 确认密码
      code: "", // 验证码
      svgCaptcha: ""
    };
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      const { sid } = this.$store.state;

      getCaptchaAsync(sid).then(res => {
        this.svgCaptcha = res.data;
      });
    },
    async doRegister() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        registerAsync({
          username: this.username,
          name: this.name,
          password: this.password,
          code: this.code,
          sid: this.$store.state.sid
        })
          .then(() => {
            this.username = "";
            this.name = "";
            this.password = "";
            this.rePassword = "";
            this.code = "";

            requestAnimationFrame(() => {
              this.$refs.observer.reset();
            });

            this.$alert("注册成功");
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          })
          .catch(err => {
            const { msg, code } = err.data;

            if (`${code}` === "500") {
              /**
               * 利用服务端进行验证码校验(Server Side Validation)
               *
               * msg格式：
               * {
               *  "field1": ["array of errors"],
               *  "field2": ["array of errors"]
               * }
               */
              this.$refs.observer.setErrors(msg);
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
