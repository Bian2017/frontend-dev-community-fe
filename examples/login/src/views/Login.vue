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
              <form method="post">
                <div class="layui-form-item">
                  <label for="email" class="layui-form-label">邮箱</label>
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="email"
                        v-model="email"
                        placeholder="请输入邮箱"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <span class="error layui-form-mid">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="layui-form-item">
                  <label for="password" class="layui-form-label">密码</label>
                  <ValidationProvider name="password" rules="required|min:6" v-slot="{ errors }">
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
                  </ValidationProvider>
                </div>

                <div class="layui-form-item">
                  <label for="verificationCode" class="layui-form-label">验证码</label>
                  <ValidationProvider
                    name="verificationCode"
                    rules="required|length:4"
                    v-slot="{ errors }"
                  >
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="verificationCode"
                        v-model="verificationCode"
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
                  <button class="layui-btn">立即登录</button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { getCaptchaAsync } from "@/services/login";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      verificationCode: "", // 验证码
      svgCaptcha: ""
    };
  },
  components: {
    ValidationProvider
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      getCaptchaAsync().then(res => {
        this.svgCaptcha = res;
      });
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
