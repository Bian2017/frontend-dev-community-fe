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
      <span class="fly-signin-days">
        已连续签到
        <cite>16</cite>天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <button class="layui-btn layui-btn-danger" id="LAY_signin">今日签到</button>
      <span>
        可获得
        <cite>5</cite>飞吻
      </span>

      <!-- 已签到状态 -->
      <!--
          <button class="layui-btn layui-btn-disabled">今日已签到</button>
          <span>获得了<cite>20</cite>飞吻</span>
      -->
    </div>
    <div class="modal" v-show="isShow">
      <div class="mask" @click="close()"></div>
      <div class="layui-layer layui-layer-page info" :class="{ active: isShow }">
        <div class="layui-layer-title">
          签到说明
          <div class="layui-icon layui-icon-close pull-right" @click="close()"></div>
        </div>
        <div class="layui-layer-content">
          <div class="layui-text">
            <blockquote class="layui-elem-quote">"签到"可获得的社区积分，规则如下</blockquote>
            <table class="layui-table">
              <thead>
                <tr>
                  <th>连续签到天数</th>
                  <th>每天可获积分</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&lt;5</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>&ge;5</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>&ge;15</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>&ge;30</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>&ge;100</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>&ge;365</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p>中间若有间隔，则连续天数重新计算</p>
              <p class="orange">不可复用程序自动签到，否则积分清零</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-show="showList">
      <div class="mask" @click="close()"></div>
      <div class="layui-layer layui-layer-page info" :class="{ active: showList }">
        <div class="layui-layer-title">
          签到活跃榜 - TOP
          <div class="layui-icon layui-icon-close pull-right" @click="close()"></div>
        </div>
        <div class="layui-layer-content pd0">
          <div class="layui-tab layui-tab-brief">
            <ul class="layui-tab-title">
              <li :class="{ 'layui-this': current === 0 }" @click="choose(0)">最新签到</li>
              <li :class="{ 'layui-this': current === 1 }" @click="choose(1)">今日最快</li>
              <li :class="{ 'layui-this': current === 2 }" @click="choose(2)">总签到榜</li>
            </ul>
            <div class="layui-tab-content">
              <ul class="layui-tab-item layui-show">
                <li v-for="(item, index) in lists" :key="'sign' + index">
                  <img src="/img/avatar.jpg" alt="" class="mr10" />
                  <cite class="fly-link">{{ item.name }}</cite>
                  <span class="fly-grey" v-if="current !== 2">签到于 {{ item.created }}</span>
                  <span class="fly-grey" v-else>
                    已经连续签到 <i class="orange">{{ item.count }}</i> 天
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sign",
  data() {
    return {
      isShow: false,
      showList: false,
      current: 0,
      lists: [
        {
          name: "test1",
          count: 4,
          created: "2020-01-01"
        },
        {
          name: "test1",
          count: 3,
          created: "2020-01-01"
        },
        {
          name: "test1",
          count: 2,
          created: "2020-01-01"
        },
        {
          name: "test1",
          count: 1,
          created: "2020-01-01"
        }
      ]
    };
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
      console.log("val:", val);
      this.current = val;
    }
  }
};
</script>

<style lang="less" scoped>
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
