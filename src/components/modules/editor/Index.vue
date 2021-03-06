<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="choose(1)">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="choose(2)">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote" @click="choose(3)">”</span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="addHr()">hr</span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          name="content"
          class="layui-textarea fly-editor"
          ref="textEdit"
          @focus="focusEvent()"
          @blur="blurEvent()"
          v-model="content"
        ></textarea>
      </div>
    </div>
    <div ref="modal">
      <face :isShow="current === 0" @closeEvent="closeModal()" @addEvent="addFace"></face>
      <img-upload :isShow="current === 1" @closeEvent="closeModal()" @addEvent="addPic"></img-upload>
      <link-add :isShow="current === 2" @closeEvent="closeModal()" @addEvent="addLink"></link-add>
      <quote :isShow="current === 3" @closeEvent="closeModal()" @addEvent="addQuote"></quote>
      <code-input
        :isShow="current === 4"
        :width="codeWidth"
        :height="codeHeight"
        @closeEvent="closeModal()"
        @addEvent="addCode"
      ></code-input>
      <preview :isShow="current === 6" @closeEvent="closeModal()" :content="content"></preview>
    </div>
  </div>
</template>

<script>
import Face from "./Face.vue";
import ImgUpload from "./ImgUpload.vue";
import LinkAdd from "./LinkAdd.vue";
import Quote from "./Quote.vue";
import CodeInput from "./Code.vue";
import Preview from "./Preview.vue";

export default {
  name: "Editor",
  props: ["initContent"],
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Quote,
    CodeInput,
    Preview
  },
  data() {
    return {
      current: "",
      codeWidth: 400,
      codeHeight: 200,
      content: "", // 文本内容
      pos: "" // 光标位置
    };
  },
  watch: {
    /**
     * 初始化发帖组件的时候，会初始化富文本组件。当发帖组件弹出模态框时，用户尚未点击确认按钮，
     * 此时initContent的内容为空。故不能使用mounted方法，得使用watch方法
     */
    initContent(newval) {
      this.content = newval;
    }
  },
  mounted() {
    // nextTick: 将回调延迟到下次DOM更新循环之后执行
    this.$nextTick(() => {
      /**
       * 当点击face以外的地方时，需隐藏face。利用事件冒泡的原理，
       * 当我们vue组件下次去进行页面元素刷新的时候，去判断下
       * 有没有点击face以外的内容。如果点击，则隐藏face
       */
      document
        .querySelector("body")
        .addEventListener("click", this.handleBodyClick);

      // 通过取textEdit的大小来动态调整代码输入框的宽高
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60;
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80;

      window.addEventListener("resize", () => {
        this.codeWidth = this.$refs.textEdit.offsetWidth - 60;
        this.codeHeight = this.$refs.textEdit.offsetHeight - 80;
      });
    });
  },
  beforeDestroy() {
    // 由于组件不停的创建或销毁，会导致重复添加监听事件，故此处需移除事件
    document
      .querySelector("body")
      .removeEventListener("click", this.handleBodyClick);
  },
  updated() {
    this.$emit("changeContent", this.content);
  },
  methods: {
    closeModal() {
      this.current = "";
    },
    focusEvent() {
      this.getPos();
    },
    blurEvent() {
      this.getPos();
    },
    // 计算光标当前位置
    getPos() {
      let cursorPos = 0;
      const elem = document.getElementById("edit");

      // IE: Selection对象表示用户选择的文本范围或插入符号的当前位置
      if (document.selection) {
        // 创建文本区域对象(即获取光标位置)
        const selectRange = document.selection.createRange();
        // 选定区起始点向后移动xx个字符
        selectRange.moveStart("character", -elem.value.length);
        // 获取整个文本长度
        cursorPos = selectRange.text.length;
      } else if (elem.selectionStart || elem.selectionStart === "0") {
        // selectionStart: 被选中的第一个字符的位置
        cursorPos = elem.selectionStart;
      }
      this.pos = cursorPos;
    },
    choose(index) {
      if (index === this.current) {
        this.closeModal();
      } else {
        this.current = index;
      }
    },
    // 添加表情
    addFace(item) {
      const insertContent = ` face${item}`;
      this.insert(insertContent);
      this.pos += insertContent.length; // 光标的下一个位置
    },
    // 添加图片链接
    addPic(item) {
      const insertContent = ` img[${item}]`;
      this.insert(insertContent);
      this.pos += insertContent.length; // 光标的下一个位置
    },
    // 添加链接
    addLink(item) {
      const insertContent = ` a(${item})[${item}]`;
      this.insert(insertContent);
      this.pos += insertContent.length; // 光标的下一个位置
    },
    // 添加代码
    addCode(item) {
      const insertContent = ` \n[pre]\n(${item})\n[/pre]`;
      this.insert(insertContent);
      this.pos += insertContent.length; // 光标的下一个位置
    },
    // 添加引用
    addQuote(item) {
      const insertContent = ` \n[quote]\n(${item})\n[/quote]`;
      this.insert(insertContent);
      this.pos += insertContent.length; // 光标的下一个位置
    },
    // 添加hr
    addHr() {
      this.insert("\n[hr]");
      this.pos += 5; // 光标的下一个位置
    },
    insert(val) {
      if (typeof this.content === "undefined") {
        return;
      }

      // 把空字符串作为分隔符，则每个字符之间都会被分割
      const tmp = this.content.split("");
      // 在要插入的位置插入对应的内容(0表示不会删除项目)
      tmp.splice(this.pos, 0, val);
      this.content = tmp.join("");
    },
    // 触发隐藏本组件的关闭事件，改变isShow状态
    handleBodyClick(e) {
      // 防止事件冒泡
      e.stopPropagation();

      // 判断是否点击到非控制ICON以外 + 本组件 的地方
      if (
        !(
          this.$refs.icons.contains(e.target) ||
          this.$refs.modal.contains(e.target)
        )
      ) {
        this.closeModal();
      }
    }
  }
};
</script>

<style lang="less">
.fly-editor {
  height: 260px;
}

.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}

.edit-wrap {
  position: relative;
}

.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 10;
  background: #fff;
}

.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
