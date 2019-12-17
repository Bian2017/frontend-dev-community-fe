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
              <form method="post">
                <div class="layui-form-item">
                  <label for="username" class="layui-form-label">邮箱</label>
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
                    <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                    <div class="layui-form-mid error">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>

                <div class="layui-form-item">
                  <label class="layui-form-label">昵称</label>
                  <ValidationProvider
                    name="nickname"
                    rules="required|min:6|max:16"
                    v-slot="{ errors }"
                  >
                    <div class="layui-input-inline">
                      <input
                        type="nickname"
                        name="nickname"
                        v-model="nickname"
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
                    rules="required|min:6|max:16"
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
                  <ValidationProvider
                    name="password"
                    rules="required|min:6|max:16"
                    v-slot="{ errors }"
                  >
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="password"
                        v-model="confirmPassword"
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
                  <button class="layui-btn" lay-filter="*" lay-submit>立即注册</button>
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
  name: "register",
  components: {
    ValidationProvider
  },
  data() {
    return {
      email: "", // 邮箱
      nickname: "", // 昵称
      password: "",
      confirmPassword: "", // 确认密码
      verificationCode: "", // 验证码
      svgCaptcha: ""
    };
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
