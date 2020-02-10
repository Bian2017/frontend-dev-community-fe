<template>
  <div class="panel main pd20">
    <div class="msg">Hi, Admin, 你已经是我们的正式会员!</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">我的会员信息</div>
          <div class="content">你的积分有:60</div>
        </div>
      </div>
      <div class="layui-col-md6">
        <sign class="border"></sign>
      </div>
      <div class="layui-col-md12 mt-20">
        <div class="panel border">
          <div class="title">快捷方式</div>
          <div class="content" style="height: auto;">
            <ul class="layui-row layui-col-space10">
              <li
                class="layui-col-sm3 layui-col-xs4"
                v-for="(item, index) in lists"
                :key="'center'+index"
              >
                <a>
                  <div class="layui-icon" :class="item.icon"></div>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from "@/components/sidebar/Sign.vue";

export default {
  name: "user-center",
  data() {
    return {
      lists: [
        {
          icon: "layui-icon-set",
          name: "修改信息"
        },
        {
          icon: "layui-icon-face-smile",
          name: "修改头像"
        },
        {
          icon: "layui-icon-password",
          name: "修改密码"
        },
        {
          icon: "layui-icon-app",
          name: "账号绑定"
        },
        {
          icon: "layui-icon-add-circle",
          name: "发布新帖"
        },
        {
          icon: "layui-icon-share",
          name: "查看分享"
        },
        {
          icon: "layui-icon-username",
          name: "我的帖子"
        },
        {
          icon: "layui-icon-rate-solid",
          name: "我的收藏"
        },
        {
          icon: "layui-icon-template-1",
          name: "其他资料"
        },
        {
          icon: "layui-icon-login-wechat",
          name: "关注公共号"
        },
        {
          icon: "layui-icon-read",
          name: "文档"
        },
        {
          icon: "layui-icon-user",
          name: "后台管理"
        }
      ]
    };
  },
  components: {
    Sign
  }
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 768px) {
  .panel {
    &.main {
      margin: 0 !important;
    }
  }
}

.panel {
  color: #333;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &.main {
    margin: 0 0 10px 225px;
  }
}

.msg {
  background-color: #f8f8f8;
  color: #666;
  padding: 10px 15px;
  margin-bottom: 20px;
}

.border {
  border: 1px solid #e6e6e6;
}

.pd20 {
  padding: 20px;
}

.mt-20 {
  margin-top: -20px;
}

.title {
  color: #333;
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dotted #e9e9e9;
  font-size: 14px;
}

.content {
  color: #666;
  padding: 18px 15px;
  height: 50px;
  line-height: 26px;
  font-size: 14px;
}

li {
  text-align: center;
  padding: 5px;
}

.layui-icon {
  background-color: #2f9688;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 30px;
}
</style>
