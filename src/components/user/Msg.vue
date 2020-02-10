<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
      <button class="layui-btn layui-btn-danger" id="LAY_delallmsg">清空全部消息</button>
      <div id="LAY_minemsg" style="margin-top: 10px;">
        <ul class="mine-msg">
          <li>
            <blockquote class="layui-elem-quote">
              <a href target="_blank">
                <cite>Absolutely</cite>
              </a>回答了您的求解
              <a href target="_blank">
                <cite>layui后台框架</cite>
              </a>
            </blockquote>
            <p>
              <span>1小时前</span>
              <a
                href="javascript:;"
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
              >删除</a>
            </p>
          </li>
          <li>
            <blockquote class="layui-elem-quote">系统消息: 欢迎使用layui</blockquote>
            <p>
              <span>1小时前</span>
              <a
                href="javascript:;"
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
              >删除</a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-msg"
};
</script>

<style lang="less" scoped>
</style>
