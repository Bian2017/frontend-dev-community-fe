<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item" :class="{'form-group--error': $v.username.$error}">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              placeholder="请输入用户名"
              autocomplete="off"
              class="layui-input"
              v-model.trim="username"
              @input="setUsername($event.target.value)"
            />
          </div>
          <div class="error layui-form-mid" v-if="!$v.username.required">用户名不能为空</div>
          <div class="error layui-form-mid" v-if="!$v.username.email">用户名输入格式错误</div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input
              type="password"
              name="title"
              placeholder="请输入密码"
              autocomplete="off"
              class="layui-input"
              v-model="password"
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              placeholder="请输入验证码"
              autocomplete="off"
              class="layui-input"
              v-model="userCaptcha"
            />
          </div>
          <div class="layui-form-mid svg" v-html="captcha" @click="getCaptcha"></div>
        </div>

        <button type="button" class="layui-btn">点击登录</button>
        <a class="forget-password" href="http://www.layui.com">忘记密码</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'

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
  validations: {
    username: {
      required,
      email
    },
    password: {
      required
    },
    userCaptcha: {
      required
    }
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
    setUsername (value) {
      this.username = value
      // 通过调用$touch，主动进行校验
      this.$v.username.$touch()
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
  display: none;
}

.form-group--error {
  .error {
    display: block;
  }
}
</style>
