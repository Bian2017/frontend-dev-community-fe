<template>
  <div class="layui-container">
    <panel></panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{page.title}}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog ==='share'"
            >分享</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog ==='ask'"
            >提问</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog ==='advise'"
            >建议</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog ==='logs'"
            >动态</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog ==='discuss'"
            >交流</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog ==='notice'"
            >公告</span>

            <span class="layui-badge" style="background-color: #999;" v-if="page.isEnd === '0'">未结</span>
            <span class="layui-badge" style="background-color: #5FB878;" v-else>已结</span>

            <span class="layui-badge layui-bg-black" v-show="page.isTop === '1'">置顶</span>
            <span
              class="layui-badge"
              v-for="(tag, index) in page.tags"
              :class="tag.class"
              :key="'tags'+ index"
            >{{tag.name}}</span>

            <!-- <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
               <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
            </div>-->
            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i>
                {{page.answer}}
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i>
              {{page.reads}}
            </span>
          </div>
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img :src="page.user?page.user.pic: '/img/avatar.jpg'" alt="头像" />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{page.user?page.user.name:'匿名'}}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息："></i> -->
                <i
                  class="layui-badge fly-badge-vip mr10"
                  v-if="page.user && page.user.isVip !== '0'? page.user.isVip: false"
                >VIP{{page.user.isVip}}</i>
              </a>
              <span>{{page.created | formatDate}}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}积分</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin">
            <a href class="layui-btn layui-btn-sm jie-admin">编辑</a>
            <a href class="layui-btn layui-btn-sm jie-admin jie-admin-collect">收藏</a>
          </div>
          <div class="detail-body photos" v-html="content"></div>
        </div>

        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li class="jieda-daan" v-for="(item, index) in comments" :key="item._id">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img :src="item.cuid? item.cuid.pic: '/img/avatar.jpg'" alt=" " />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>{{item.cuid ? item.cuid.name: '匿名'}}</cite>
                    <i
                      v-if="item.cuid && item.cuid.isVip !== '0' ? item.cuid.isVip: false"
                      class="layui-badge fly-badge-vip"
                    >VIP{{item.cuid.isVip}}</i>
                  </a>

                  <span v-if="index === 0">(楼主)</span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>{{item.created | formatDate}}</span>
                </div>

                <!-- <i class="iconfont icon-caina" title="最佳答案"></i> -->
              </div>
              <div class="detail-body jieda-body photos" v-richtext="item.content"></div>
              <div class="jieda-reply">
                <span class="jieda-zan" :class="{'zanok': item.handed === '1'}" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>{{item.hands}}</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                  <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>
          <pagination
            :showType="'icon'"
            :hasSelect="true"
            :total="total"
            :size="size"
            :current="current"
            @changeCurrent="handleChange"
            @changeLimit="handleLimit"
          ></pagination>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer" v-slot="{validate}">
                <editor @changeContent="addContent" :initContent="editInfo.content"></editor>
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
                  <input type="hidden" name="jid" value="123" />
                  <button class="layui-btn" type="button" @click="validate().then(submit)">提交回复</button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <hot-list></hot-list>
        <ads></ads>
        <links></links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from "@/components/sidebar/HotList.vue";
import Ads from "@/components/sidebar/Ads.vue";
import Links from "@/components/sidebar/Links.vue";
import Panel from "@/components/Panel.vue";
import Editor from "@/components/modules/editor/Index.vue";
import captchaMix from "@/mixin/captcha";
import Pagination from "@/components/modules/page/Index.vue";
import { getDetail } from "@/services/content";
import { getComments, addComment } from "@/services/comment";
import { escapeHtml } from "@/utils/escapeHtml";

export default {
  name: "detail",
  mixins: [captchaMix],
  props: ["tid"], // 通过路由
  components: {
    Panel,
    HotList,
    Ads,
    Links,
    Editor,
    Pagination
  },
  data() {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        // 评论信息
        content: "",
        code: "",
        sid: ""
      }
    };
  },
  computed: {
    content() {
      if (typeof this.page.content === "undefined") {
        return "";
      }

      if (this.page.content.trim() === "") {
        return "";
      }

      return escapeHtml(this.page.content);
    }
  },
  mounted() {
    this.getPostDetail();
    this.getCommentsList();
  },
  methods: {
    handleChange(val) {
      this.current = val;
      this.getCommentsList();
    },
    handleLimit(val) {
      this.size = val;
      this.getCommentsList();
    },
    getPostDetail() {
      getDetail(this.tid).then(res => {
        console.log("res:", res);
        this.page = res.data;
      });
    },
    getCommentsList() {
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        this.comments = res.data;
        this.total = res.total;
      });
    },
    addContent(val) {
      this.editInfo.content = val;
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();

      if (!isValid) {
        return;
      }

      const { isLogin } = this.$store.state;
      if (!isLogin) {
        this.$pop("shake", "请先登录");
        return;
      }

      this.editInfo.code = this.code;
      this.editInfo.sid = this.$store.state.sid;
      this.editInfo.tid = this.tid;

      addComment(this.editInfo)
        .then(res => {
          this.$pop("", "发表评论成功");

          // 添加新的评论到评论列表
          const user = this.$store.state.userInfo;
          const cuid = {
            // eslint-disable-next-line no-underscore-dangle
            _id: user._id,
            pic: user.pic,
            name: user.name,
            isVip: user.isVip
          };
          res.data.cuid = cuid;
          this.comments.push(res.data);

          // 发表评论成功后，清空回复
          this.code = "";
          this.editInfo.content = "";

          // 清空observer
          requestAnimationFrame(() => {
            if (this.$refs.observer) {
              this.$refs.observer.reset();
            }
          });

          // 刷新图形验证码
          this.getCaptcha();
        })
        .catch(err => {
          console.log("err:", err);
          if (err.data && err.data.code === 500) {
            this.$alert(err.data.msg);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
  padding-top: 10px;
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
