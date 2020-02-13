<template>
  <div class="layui-container">
    <panel></panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>Imooc社区，基于 layui 的极简社区页面模版</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span class="layui-badge layui-bg-green fly-detail-column">动态</span>

            <span class="layui-badge" style="background-color: #999;">未结</span>
            <!-- <span class="layui-badge" style="background-color: #5FB878;">已结</span> -->

            <span class="layui-badge layui-bg-black">置顶</span>
            <span class="layui-badge layui-bg-red">精帖</span>

            <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
            </div>
            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i> 66
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i> 99999
            </span>
          </div>
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img
                src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                alt="贤心"
              />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>贤心</cite>
                <i class="iconfont icon-renzheng" title="认证信息："></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
              </a>
              <span>2017-11-30</span>
            </div>
            <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
              <span style="padding-right: 10px; color: #FF7200">悬赏：60积分</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin">
            <a href class="layui-btn layui-btn-sm jie-admin">编辑</a>
            <a href class="layui-btn layui-btn-sm jie-admin jie-admin-collect">收藏</a>
          </div>
          <div class="detail-body photos">帖子的内容部分</div>
        </div>

        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li data-id="111" class="jieda-daan">
              <a name="item-1111111111"></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img
                    src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                    alt=" "
                  />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>贤心</cite>
                    <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                    <i class="layui-badge fly-badge-vip">VIP3</i>
                  </a>

                  <span>(楼主)</span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>2017-11-30</span>
                </div>

                <i class="iconfont icon-caina" title="最佳答案"></i>
              </div>
              <div class="detail-body jieda-body photos">
                <p>香菇那个蓝瘦，这是一条被采纳的回帖</p>
              </div>
              <div class="jieda-reply">
                <span class="jieda-zan zanok" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>66</em>
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

            <li data-id="111">
              <a name="item-1111111111"></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img
                    src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                    alt=" "
                  />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>贤心</cite>
                  </a>
                </div>
                <div class="detail-hits">
                  <span>2017-11-30</span>
                </div>
              </div>
              <div class="detail-body jieda-body photos">
                <p>蓝瘦那个香菇，这是一条没被采纳的回帖</p>
              </div>
              <div class="jieda-reply">
                <span class="jieda-zan" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>0</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                  <span class="jieda-accept" type="accept">采纳</span>
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <!-- <li class="fly-none">消灭零回复</li> -->
          </ul>
          <pagination
            :showType="'icon'"
            :hasSelect="true"
            :total="total"
            :size="size"
            :current="current"
            @changeCurrent="handleChange"
          ></pagination>
          <div class="layui-form layui-form-pane">
            <form>
              <editor></editor>
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
                <button class="layui-btn" type="button">提交回复</button>
              </div>
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

export default {
  name: "detail",
  mixins: [captchaMix],
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
      total: 101,
      size: 15,
      current: 0
    };
  },
  methods: {
    handleChange(val) {
      this.current = val;
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
</style>
