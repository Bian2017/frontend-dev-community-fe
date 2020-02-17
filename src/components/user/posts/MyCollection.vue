<template>
  <div>
    <table class="layui-table">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0">
              <span>收藏时间</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="'mycollect'+index">
          <td class="title">
            <router-link class="link" :to="{name: 'detail', params:{tid: item._id}}">{{item.title}}</router-link>
          </td>
          <td class="text-right">{{item.created | formatDate}}</td>
        </tr>
      </tbody>
    </table>
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
import Pagination from "@/components/modules/page/Index.vue";
import { getCollect } from "@/services/user";

export default {
  name: "my-collection",
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      total: 0,
      current: 0,
      limit: 10
    };
  },
  mounted() {
    this.getCollectList();
  },
  methods: {
    getCollectList() {
      getCollect({
        page: this.current,
        limit: this.limit
      }).then(res => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    handleChange(val) {
      this.current = val;
      this.getCollectList();
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  width: 70%;
}
</style>
