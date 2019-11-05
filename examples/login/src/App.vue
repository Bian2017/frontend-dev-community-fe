<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <ValidationProvider name="用户名" rules="required|email" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input
                type="text"
                name="title"
                placeholder="请输入用户名"
                autocomplete="off"
                class="layui-input"
                v-model="username"
              />
            </div>
            <span class="error layui-form-mid">{{errors[0]}}</span>
          </ValidationProvider>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <ValidationProvider name="密码" rules="required" v-slot="{errors}">
            <div class="layui-input-inline">
              <input
                type="password"
                name="title"
                placeholder="请输入密码"
                autocomplete="off"
                class="layui-input"
                v-model="password"
              />
            </div>
            <span class="error layui-form-mid">{{errors[0]}}</span>
          </ValidationProvider>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <ValidationProvider name="验证码" rules="required" v-slot="{errors}">
            <div class="layui-input-inline">
              <input
                type="text"
                name="title"
                placeholder="请输入验证码"
                autocomplete="off"
                class="layui-input"
                v-model="userCaptcha"
              />
              <span class="error">{{errors[0]}}</span>
            </div>
            <div class="layui-form-mid svg" v-html="captcha" @click="getCaptcha"></div>
          </ValidationProvider>
        </div>

        <button type="button" class="layui-btn">点击登录</button>
        <a class="forget-password" href="http://www.layui.com">忘记密码</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      captcha: '',
      username: '', // 用户名
      password: '',
      userCaptcha: '', // 用户输入的验证码
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      axios.get('http://localhost:3001/captcha').then(res => {
        if (res.status === 200) {
          const resData = res.data
          if (resData.code === 0) {
            this.captcha = resData.data
          }
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#app {
  background: #f2f2f2;
}

.layui-container {
  background: #fff;
}

input {
  width: 200px;
}

.forget-password {
  margin-left: 20px;

  &:hover {
    color: #009688;
  }
}

.svg {
  position: relative;
  top: -20px;
}

.error {
  margin-left: 20px;
  color: red;
}
</style>
