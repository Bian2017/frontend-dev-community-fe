<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="content">{{msg}}</div>
      <div v-if="type==='alert'">
        <div class="btnCommon success" @click="close()">确定</div>
      </div>
      <div v-else class="space-round">
        <div class="btnCommon cancel" @click="cancelEvent()">取消</div>
        <div class="btnCommon success" @click="successEvent()">确定</div>
      </div>
    </div>
    <div class="mask" @click="closeMask()"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "alert" // 警告弹窗/确认弹窗
    },
    msg: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    },
    success: {
      type: Function,
      default: () => {
        console.log("success");
      }
    },
    cancel: {
      type: Function,
      default: () => {
        console.log("cancel");
      }
    }
  },
  methods: {
    close() {
      this.isShow = false;
    },
    closeMask() {
      if (this.type === "alert") {
        this.close();
      }
    },
    cancelEvent() {
      this.close();
      this.cancel();
    },
    successEvent() {
      this.close();
      this.success();
    }
  }
};
</script>

<style lang="less" scoped>
@btn-main: #009688;
@btn-dark: darken(@btn-main, 5%); // darken函数：降低了元素中颜色的亮度

.alert {
  background: #fff;
  border-radius: 6px;
  /****居中******/
  width: 300px;
  height: 150px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -75px;
  /**********/
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  z-index: 3000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-round {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}

.btnCommon {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;

  &.success {
    background: @btn-main;
    color: #fff;

    &:hover {
      background: @btn-dark;
    }
  }

  &.cancel {
    background: #ededed;
    color: #333;
  }
}

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 2000;
}
</style>


