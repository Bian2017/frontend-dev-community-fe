<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{ 'layui-this': status === '' && tag === '' }" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '0' }" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '1' }" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '' && tag === '精华' }" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{ 'layui-this': sort === 'created' }" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{ 'layui-this': sort === 'answer' }" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="lists" @nextpage="nextPage()" :isEnd="isEnd"></list-item>
  </div>
</template>

<script>
import { getList } from "@/services/content";
import ListItem from "./ListItem.vue";

export default {
  name: "list",
  data() {
    return {
      status: "",
      tag: "",
      sort: "created",
      page: 0,
      limit: 20,
      catalog: "",
      lists: [],
      isEnd: false,
      isRepeat: false // 减少重复请求
    };
  },
  components: {
    ListItem
  },
  mounted() {
    this.getPostList();
  },
  methods: {
    getPostList() {
      if (this.isRepeat) return;
      if (this.isEnd) return;

      this.isRepeat = true;
      const options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      };

      getList(options)
        .then(res => {
          this.isRepeat = false;

          // 小于20条则到最后一页
          if (res.length < this.limit) {
            this.isEnd = true;
          }

          if (this.lists.length === 0) {
            this.lists = res;
          } else {
            this.lists = this.lists.concat(res);
          }
        })
        .catch(err => {
          this.isRepeat = false;

          if (err) {
            this.$alert(err.msg);
          }
        });
    },
    nextPage() {
      this.page += 1;
      this.getPostList();
    },
    search(val) {
      switch (val) {
        // 未结贴
        case 0:
          this.status = "0";
          this.tag = "";
          break;
        // 已结贴
        case 1:
          this.status = "1";
          this.tag = "";
          break;
        // 查询“精华”标签
        case 2:
          this.status = "";
          this.tag = "精华";
          break;
        // 按照时间去查询
        case 3:
          this.sort = "created";
          break;
        // 按照评论数去查询
        case 4:
          this.sort = "answer";
          break;
        // 综合查询
        default:
          this.status = "";
          this.tag = "";
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
