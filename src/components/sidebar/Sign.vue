<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showInfo()">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showTop()">
        活跃榜
        <span class="layui-badge-dot"></span>
      </a>
      <span class="fly-signin-days" v-show="isSign || isLogin">
        已连续签到
        <cite>{{ count }}</cite>
        天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger" @click="sign()">今日签到</button>
        <span>
          可获得
          <cite>{{ favs }}</cite>
          飞吻
        </span>
      </template>
      <template v-else>
        <!-- 已签到状态 -->
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span>
          获得了
          <cite>{{ favs }}</cite>
          飞吻
        </span>
      </template>
    </div>
    <sign-info :isShow="isShow" @closeModal="close()"></sign-info>
    <sign-list :isShow="showList" @closeModal="close()"></sign-list>
  </div>
</template>

<script>
import moment from "moment";
import SignInfo from "./SignInfo.vue";
import SignList from "./SignList.vue";
import { createSign } from "@/services/user";

export default {
  name: "sign",
  components: {
    SignInfo,
    SignList
  },
  data() {
    return {
      isShow: false,
      showList: false,
      current: 0,
      isSign: false // 是否签到
    };
  },
  watch: {
    userInfo(newval) {
      if (newval.isSign === true) {
        this.isSign = true;
      } else {
        this.isSign = false;
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo; // userInfo存在异步情况
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    count() {
      if (JSON.stringify(this.$store.state.userInfo) !== "{}") {
        if (typeof this.$store.state.userInfo.count !== "undefined") {
          return this.$store.state.userInfo.count;
        }
        return 0;
      }
      return 0;
    },
    favs() {
      const cnt = parseInt(this.count, 10);
      let result = 0;

      if (cnt < 5) {
        result = 5;
      } else if (cnt >= 5 && cnt < 15) {
        result = 10;
      } else if (cnt >= 15 && cnt < 30) {
        result = 15;
      } else if (cnt >= 30 && cnt < 100) {
        result = 20;
      } else if (cnt >= 100 && cnt < 365) {
        result = 30;
      } else if (cnt >= 365) {
        result = 50;
      }

      return result;
    }
  },
  mounted() {
    const { isSign } = this.$store.state.userInfo;
    const { lastSign } = this.$store.state.userInfo;

    const nowDate = moment().format("YYYY-MM-DD");
    const lastDate = moment(lastSign).format("YYYY-MM-DD");
    const diff = moment(nowDate).diff(moment(lastDate), "day");

    // 如果用户上一次签到时间与当天的签到日期相差1天，允许用户进行签到
    if (diff > 0 && isSign) {
      this.isSign = false;
    } else {
      this.isSign = isSign;
    }
  },
  methods: {
    showInfo() {
      this.isShow = true;
    },
    showTop() {
      this.showList = true;
    },
    close() {
      this.isShow = false;
      this.showList = false;
    },
    choose(val) {
      this.current = val;
    },
    sign() {
      if (!this.isLogin) {
        this.$pop("shake", "请先登录");
        return;
      }

      createSign()
        .then(res => {
          const user = this.$store.state.userInfo;

          user.favs = res.favs;
          user.count = res.count;

          this.isSign = true;
          user.isSign = true;
          user.lastSign = res.lastSign;
          this.$store.commit("setUserInfo", user); // 更新UserInfo信息
          this.$pop("", "签到成功");
        })
        .catch(err => {
          if (err.data.code === 500) {
            const user = this.$store.state.userInfo;

            this.isSign = true;
            user.isSign = true;
            user.lastSign = err.lastSign;
            this.$store.commit("setUserInfo", user); // 更新UserInfo信息

            this.$pop("", err.data.msg);
          }
        });
    }
  }
};
</script>

<style lang="less">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.mask {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.layui-layer {
  position: fixed;
  width: 300px;
  height: 480px;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background: #fff;
  z-index: 21000;

  &.active {
    animation-fill-mode: both;
    animation-duration: 0.3s;
    animation-name: bounceIn;
  }

  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    padding: 0 20px;
    color: #333;
    background-color: #f8f8f8;
  }

  .layui-layer-content {
    padding: 20px;
  }

  .layui-tab-content {
    padding: 0 10px;
  }

  .layui-tab-item {
    line-height: 40px;

    li {
      border-bottom: 1px dotted #dcdcdc;
      &:last-child {
        border-bottom: none;
      }
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
  }
}
</style>
