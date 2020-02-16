<template>
  <div>
    <div class="overflow">
      <!-- H5不支持cellspacing&cellpadding，CSS等价border-collapse: collapse;  -->
      <!-- border-spacing: 0 -->
      <table class="layui-table" cellspacing="0" cellpadding="0" border="0">
        <thead>
          <tr class="layui-table-header">
            <th>
              <div class="layui-table-cell pl0">
                <span>帖子标题</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>状态</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>结贴</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>发表时间</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>数据</span>
              </div>
            </th>
            <th class="min-cell">
              <div class="layui-table-cell">
                <span>操作</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item, index) in list" :key="'mypost'+ index">
            <td class="text-left">
              <router-link
                class="link"
                :to="{name: 'detail', params: {tid: item._id}}"
              >{{item.title}}</router-link>
            </td>
            <td>{{item.status === '0'? '打开': '关闭'}}</td>
            <td :class="{'success': item.isEnd !=='0'}">{{item.isEnd === '0'? '未结': '已结贴'}}</td>
            <td>{{item.created | formatDate}}</td>
            <td>{{item.reads}}阅/{{item.answer}}答</td>
            <td>
              <div
                class="layui-btn layui-btn-xs"
                :class="{'layui-btn-disabled': item.isEnd ==='1'}"
                @click="editPost(item)"
              >编辑</div>
              <div class="layui-btn layui-btn-xs layui-btn-danger" @click="deletePost(item)">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :current="current"
      :align="'left'"
      :hasTotal="false"
      :hasSelect="true"
      @changeCurrent="handleChange"
    ></pagination>
  </div>
</template>

<script>
import { getPostListByUid, deletePostByUid } from "@/services/user";
import Pagination from "@/components/modules/page/Index.vue";

export default {
  name: "my-post",
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      total: 0,
      limit: 10,
      current: 0
    };
  },
  mounted() {
    this.getPostList();
  },
  methods: {
    getPostList() {
      getPostListByUid({
        page: this.current,
        limit: this.limit
      }).then(res => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    deletePost(item) {
      this.$confirm(
        "确定删除吗",
        () => {
          if (item.isEnd !== "0") {
            this.$pop("shake", "帖子已结贴，无法删除");
            return;
          }

          deletePostByUid({
            // eslint-disable-next-line no-underscore-dangle
            tid: item._id
          })
            .then(() => {
              this.$pop("", "删除成功");
              this.list.splice(this.list.indexOf(item), 1);
            })
            .catch(err => {
              this.$pop("shake", err.data.msg);
            });
        },
        () => {}
      );
    },
    handleChange(val) {
      this.current = val;
      this.getPostList();
    },
    editPost(item) {
      if (item.isEnd === "1") {
        this.$pop("shake", "帖子已经结贴，无法编辑");
      } else {
        this.$router.push({
          name: "edit",
          // eslint-disable-next-line no-underscore-dangle
          params: { tid: item._id, page: item }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.overflow {
  overflow-y: hidden;
}

.min-cell {
  min-width: 80px;
}

.link {
  color: #01aaed;
}

.success {
  color: #5fb878;
}

.layui-table-header {
  th {
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }
}
</style>
