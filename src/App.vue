<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less">
@import "./assets/css/global.css";
@import "./assets/css/layui-layer/layer.css";

// 公共样式
.gray {
  color: #999;
}

.link {
  color: #01aaed;
}

.orange {
  color: #ff5722;
}

.pull-right {
  float: right !important;
}

.pd0 {
  padding: 0px !important;
}

.pd20 {
  padding: 20px;
}

.pb30 {
  padding-bottom: 30px;
}

.mr10 {
  margin-right: 10px;
}

.ml10 {
  margin-left: 10px !important;
}

.mt10 {
  margin-top: 10px;
}

.mt20 {
  margin-top: 20px;
}

.pl0 {
  padding-left: 0;
}

.pr0 {
  padding-right: 0;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &.flex-start {
    justify-content: flex-start;
  }

  &.flex-end {
    justify-content: flex-end;
  }

  &.flex-center {
    justify-content: center;
  }
}

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

@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

// transition组件需结合过渡的类名
.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}
</style>
