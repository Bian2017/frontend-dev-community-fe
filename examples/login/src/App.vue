<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="title"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input
              type="password"
              name="title"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid" v-html="captcha"></div>
        </div>

        <button type="button" class="layui-btn">点击登录</button>
        <a class="forget-password" href="http://www.layui.com">忘记密码</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      captcha: ''
    }
  },
  mounted () {
    axios.get('http://localhost:3001/captcha').then(res => {
      if (res.status === 200) {
        const resData = res.data
        if (resData.code === 0) {
          this.captcha = resData.data
        }
      }
    })
  }
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
</style>
