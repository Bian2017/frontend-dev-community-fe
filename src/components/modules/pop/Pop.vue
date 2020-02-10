<template>
  <!-- 由于并不知道msg的长度，所以通过ref属性来动态计算组件的宽和高 -->
  <div class="tips animation" :class="{ shake: type === 'shake' }" v-show="isShow" ref="tips">
    <div class="content">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "Pop",
  props: {
    type: {
      type: String, // 不同动画方式
      default: ""
    },
    msg: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow(newval, oldval) {
      if (newval !== oldval && newval === true) {
        // 显示pop组件
        setTimeout(() => {
          // 获得当前容器的高度、宽度
          const height = this.$refs.tips.clientHeight;
          const width = this.$refs.tips.clientWidth;

          // 改变容器的margin
          this.$refs.tips.style.marginLeft = `${-width / 2}px`;
          this.$refs.tips.style.marginTop = `${-height / 2}px`;
        }, 0);

        // 消失
        setTimeout(() => {
          this.isShow = false;
          this.msg = "";
          this.type = "";
        }, 3000);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}

.tips {
  position: fixed;
  left: 50%;
  top: 50%;
}

.animation {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.content {
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 10px 15px;
  border-radius: 6px;
}

.shake {
  animation-name: shake;
}
</style>
