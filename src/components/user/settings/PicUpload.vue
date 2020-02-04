<template>
  <div>
    <div class="layui-form layui-form-pane layui-tab-item layui-show">
      <div class="layui-form-item">
        <div class="avatar-add">
          <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
          <button type="button" class="layui-btn upload-img">
            <i class="layui-icon">&#xe67c;</i>上传头像
          </button>
          <img
            src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
          />
          <span class="loading"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pic-upload"
};
</script>

<style lang="less" scoped>
</style>
