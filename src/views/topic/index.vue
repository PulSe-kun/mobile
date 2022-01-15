<template>
  <!-- 上拉加载 -->
  <div class="topic">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="topicList" v-for="item in list" :key="item.id">
        <img :src="item.scene_pic_url" alt="" />
        <p class="title">{{ item.title }}</p>
        <p class="info">{{ item.subtitle }}</p>
        <p class="price">{{ item.price_info }}元起</p>
      </div>
    </van-list>
  </div>
</template>

<script>
import { listaction } from "@/api/topic/";
export default {
  data() {
    return {
      list: [],
      start: 1,
      total: 0,
      loading: false,
      finished: false,
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      listaction({
        page: this.start,
      }).then((res) => {
        console.log(res);
        //👉构造字面量数组时使用展开语法
        //list 中的数据应为第一页依次加到第四页
        this.list.push(...res.data);
        //数据更新完，需要将 loading 设置成 false
        this.loading = false;
        //需判断页面数据全部加载完毕
        this.total = res.total;
      });
    },
    onLoad() {
      this.start++; //下一页数据请求
      if (this.start > this.total) {
        //注意总数是4页
        //当页面数据加载完毕,finished变成true
        this.finished = true;
        return;
      }
      this.init();
    },

    //  goInfo(id) {
    //   this.$router.push(`/topic/topicInfo?id=${id}`);
    // },
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>