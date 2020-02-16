<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->

      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">
              发表新帖
              <!-- 编辑帖子 -->
            </li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <form>
                <validation-observer ref="observer" v-slot="{ validate }">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <validation-provider name="catalog" rules="is_not:请选择" v-slot="{ errors }">
                        <div class="layui-row">
                          <label class="layui-form-label">所在专栏</label>
                          <div class="layui-input-block" @click="changeCata">
                            <div
                              class="layui-unselect layui-form-select"
                              :class="{'layui-form-selected': isSelectCata}"
                            >
                              <div class="layui-select-title">
                                <input
                                  type="text"
                                  placeholder="请选择"
                                  readonly
                                  v-model="catalogs[cataIndex].text"
                                  class="layui-input layui-unselect"
                                />
                                <i class="layui-edge"></i>
                              </div>
                              <dl class="layui-anim layui-anim-upbit">
                                <!-- 通过事件冒泡来收起下拉选中框 -->
                                <dd
                                  v-for="(item, index) in catalogs"
                                  :key="'catalog' + index"
                                  :class="{'layui-this': index === cataIndex}"
                                  @click="chooseCatalog(item, index)"
                                >{{item.text}}</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00;">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>
                    <div class="layui-col-md9">
                      <validation-provider name="title" rules="required" v-slot="{ errors }">
                        <div class="layui-row">
                          <label for="L_title" class="layui-form-label">标题</label>
                          <div class="layui-input-block">
                            <input type="text" class="layui-input" v-model="title" />
                          </div>
                        </div>
                        <div class="lay-row">
                          <span style="color: #c00;">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>
                  </div>
                  <editor @changeContent="add" :initContent="content"></editor>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px;">
                        <div
                          class="layui-unselect layui-form-select"
                          :class="{'layui-form-selected': isSelectFav}"
                          @click="changeFav"
                        >
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect"
                            />
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <!-- 通过事件冒泡来收起下拉选中框 -->
                            <dd
                              v-for="(item, index) in favList"
                              :key="'catalog' + index"
                              :class="{'layui-this': index === favIndex}"
                              @click="chooseFav(item, index)"
                            >{{item}}</dd>
                          </dl>
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
import { addPost } from "@/services/content";
import Editor from "@/components/modules/editor/Index.vue";
import captchaMix from "@/mixin/captcha";

export default {
  name: "add",
  mixins: [captchaMix],
  components: {
    Editor
  },
  data() {
    return {
      isSelectCata: false,
      isSelectFav: false,
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
    const saveData = localStorage.getItem("addData");

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
          localStorage.setItem("addData", "");
        }
      );
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
        localStorage.setItem("addData", JSON.stringify(saveData));
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
      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      })
        .then(res => {
          localStorage.setItem("addData", ""); // 清空已经发布的内容
          this.$pop("", "发帖成功");

          setTimeout(() => {
            this.$router.push({
              name: "detail",
              // eslint-disable-next-line no-underscore-dangle
              params: { tid: res.data._id }
            });
          }, 1000);
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
