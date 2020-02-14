<template>
  <div
    class="d-flex"
    :class="{'flex-center': align==='center', 'flex-start': align==='left', 'flex-end': align==='right'}"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        href="javascript:;"
        class="layui-laypage-prev"
        :class="{'layui-disabled': current === 0 }"
        @click.prevent="home()"
        v-show="showEnd"
      >
        <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <a href="javascript:;" :class="{'layui-disabled': current === 0}" @click.prevent="prev()">
        <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <!-- current + 2 < pages.length 显示 ... -->
      <!-- current - 2 < 1 显示 ... -->
      <a
        v-if="pages.length > 5 && current + 1 - 2 > 1"
        href="javascript:;"
        class="layui-disabled"
      >...</a>
      <template v-for="(item, index) in pages">
        <a
          v-if="item >= (current + 1 - 2) &&  item <= (current + 1 + 2)"
          href="javascript:;"
          :key="'page'+ index"
          @click="changeIndex(item)"
          :class="[
            current === index? theme: '',
            current === index?'active': ''
          ]"
        >{{item}}</a>
      </template>
      <a
        v-if="pages.length > 5 && current + 1 + 2 < pages.length"
        href="javascript:;"
        class="layui-disabled"
      >...</a>

      <a
        href="javascript:;"
        :class="{'layui-disabled': current === pages.length - 1}"
        @click.prevent="next()"
      >
        <i class="layui-icon layui-icon-right" v-if="showType ==='icon'"></i>
        <template v-else>下一页</template>
      </a>
      <a
        href="javascript:;"
        class="layui-laypage-next"
        v-show="showEnd"
        :class="{'layui-disabled': current === pages.length - 1}"
        @click.prevent="end()"
      >
        <i class="layui-icon layui-icon-next" v-if="showType ==='icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="hasTotal">
      到第
      <input type="text" class="page-input" />页 共 total 页
    </div>
    <div v-if="hasSelect">
      <div
        class="layui-unselect layui-form-select"
        :class="{'layui-form-selected': isSelect}"
        @click="changeFav"
      >
        <div class="layui-select-title">
          <input
            type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
          />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <!-- 通过事件冒泡来收起下拉选中框 -->
          <dd
            v-for="(item, index) in options"
            :key="'catalog' + index"
            :class="{'layui-this': index === optIndex}"
            @click="chooseFav(item, index)"
          >{{item}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "loadsh";

export default {
  name: "pagination",
  props: {
    align: {
      type: String,
      default: "center"
    },
    showType: {
      // 用Icon方式还是文字方式进行显示
      type: String,
      default: "text"
    },
    showEnd: {
      // 显示有没有首页或尾页这两个按钮
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: "layui-bg-green"
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    size: {
      // 用户想插入的pageSize
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      isSelect: false,
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      pages: [],
      limit: 10 // 每页显示的size
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    total(newval, oldval) {
      // 当total发生变化时，重新初始化分页码
      this.initPages();
    }
  },
  mounted() {
    // 设置select的内容
    this.limit = this.size;

    // 初始化分页的长度
    this.initPages();

    // 先合并，然后排序，然后创建去重的数组副本
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)));
    this.optIndex = this.options.indexOf(this.size);
  },
  methods: {
    // 根据total显示pages
    initPages() {
      const len = Math.ceil(this.total / this.limit);
      // 5 -> [1, 2, 3, 4, 5]
      this.pages = _.range(1, len + 1);
    },
    chooseFav(item, index) {
      if (this.optIndex !== index) {
        // 当页面上的limit发生变化之后，需调整current数值
        this.$emit(
          "changeCurrent",
          Math.floor((this.limit * this.current) / this.options[index])
        );
      }
      this.optIndex = index;
      this.limit = this.options[this.optIndex];
      this.initPages();
    },
    changeFav() {
      this.isSelect = !this.isSelect;
    },
    home() {
      this.$emit("changeCurrent", 0);
    },
    end() {
      this.$emit("changeCurrent", this.pages.length - 1);
    },
    prev() {
      let current = 0;
      if (this.current - 1 < 0) {
        current = 0;
      } else {
        current = this.current - 1;
      }
      this.$emit("changeCurrent", current);
    },
    next() {
      let current = 0;
      if (this.current + 1 > this.pages.length) {
        current = this.pages.length - 1;
      } else {
        current = this.current + 1;
      }
      this.$emit("changeCurrent", current);
    },
    changeIndex(val) {
      this.$emit("changeCurrent", val - 1);
    }
  }
};
</script>

<style lang="less" scoped>
.layui-laypage {
  a {
    margin-left: -1px;

    &.active {
      border-radius: 2px;
      position: relative; // 避免被margin-left: -1px; 进行遮挡
      z-index: 100;
    }
  }

  .layui-bg-green {
    border-color: #009688;
  }
}

.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2px;
}

.page-input {
  width: 30px;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
}

.layui-input {
  height: 30px;
  line-height: 30px;
}

.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
