<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->

      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">编辑帖子</li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <form>
                <validation-observer ref="observer" v-slot="{ validate }">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <div class="layui-row">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                              <input
                                type="text"
                                placeholder="请选择"
                                readonly
                                v-model="catalogs[cataIndex].text"
                                class="layui-input layui-unselect layui-disabled"
                              />
                              <i class="layui-edge"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="layui-col-md9">
                      <div class="layui-row">
                        <label for="L_title" class="layui-form-label">标题</label>
                        <div class="layui-input-block">
                          <input type="text" class="layui-input" v-model="title" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <editor @changeContent="add" :initContent="content"></editor>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px;">
                        <div class="layui-unselect layui-form-select">
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect layui-disabled"
                            />
                            <i class="layui-edge"></i>
                          </div>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="code" class="layui-form-label">验证码</label>
                    <validation-provider name="code" rules="required|length:4" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          v-model="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                        <span class="error">{{ errors[0] }}</span>
                      </div>
                      <div class="layui-form-mid svg" v-html="svgCaptcha" @click="getCaptcha"></div>
                    </validation-provider>
                  </div>

                  <div class="layui-form-item">
                    <button type="button" class="layui-btn" @click="validate().then(submit)">立即发布</button>
                  </div>
                </validation-observer>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updatePost } from "@/services/content";
import Editor from "@/components/modules/editor/Index.vue";
import captchaMix from "@/mixin/captcha";

export default {
  name: "edit",
  props: ["tid", "page"],
  mixins: [captchaMix],
  components: {
    Editor
  },
  data() {
    return {
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: "请选择",
          value: ""
        },
        {
          text: "提问",
          value: "ask"
        },
        {
          text: "分享",
          value: "share"
        },
        {
          text: "讨论",
          value: "discuss"
        },
        {
          text: "建议",
          value: "advise"
        }
      ],
      favList: [20, 30, 50, 60, 80],
      title: "",
      content: ""
    };
  },
  mounted() {
    if (this.page) {
      this.content = this.page.content;
      this.title = this.page.title;
      this.favIndex = this.favList.indexOf(parseInt(this.page.fav, 10));
      this.cataIndex = this.catalogs.indexOf(
        this.catalogs.filter(item => item.value === this.page.catalog)[0]
      );

      // 缓存edit内容
      localStorage.setItem("editData", JSON.stringify(this.page));
    } else {
      // 页面上无page内容，可能是用户进行了刷新，则取本地缓存内容
      const saveData = localStorage.getItem("editData");

      if (saveData && saveData !== "") {
        this.$confirm(
          "是否加载未编辑完的内容?",
          () => {
            const obj = JSON.parse(saveData);

            this.content = obj.content;
            this.title = obj.title;
            this.cataIndex = obj.cataIndex;
            this.favIndex = obj.favIndex;
          },
          () => {
            localStorage.setItem("editData", "");
          }
        );
      }
    }
  },

  methods: {
    chooseCatalog(item, index) {
      this.cataIndex = index;
    },
    chooseFav(item, index) {
      this.favIndex = index;
    },
    changeCata() {
      this.isSelectCata = !this.isSelectCata;
    },
    changeFav() {
      this.isSelectFav = !this.isSelectFav;
    },
    add(val) {
      this.content = val;

      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      };

      if (this.title.trim() !== "" && this.content.trim() !== "") {
        localStorage.setItem("editData", JSON.stringify(saveData));
      }
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();

      if (!isValid) {
        return;
      }

      if (this.content.trim() === "") {
        this.$alert("文章内容不得未空!");
        return;
      }

      // 添加新的帖子
      updatePost({
        tid: this.tid, // 哪篇文章
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid
      })
        .then(() => {
          localStorage.setItem("editData", ""); // 清空已经发布的内容
          this.$alert("发帖成功~~2s后跳转");

          setTimeout(() => {
            this.$router.push({ name: "index" });
          }, 2000);
        })
        .catch(err => {
          if (err.data.code === 500) {
            this.$alert(err.data.msg);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
