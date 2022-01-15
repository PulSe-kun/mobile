<template>
  <div class="brand">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="topicList" v-for="item in list" :key="item.id" @click="goInfo(item.id)">
        <img :src="item.app_list_pic_url" alt="" />
        <div class="text">
          <span class="title">{{ item.name }}</span>
          <span class="line"></span>
          <span class="price">{{ item.floor_price }}元起</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { listaction } from "@/api/home/brand";
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
        //注意总数是9页
        //当页面数据加载完毕,finished变成true
        this.finished = true;
        return;
      }
      this.init();
    },
    goInfo(id) {
      this.$router.push(`/home/brand/detailaction?id=${id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.topicList {
  position: relative;
  background-color: #fff;
  margin-bottom: 3px;
  img {
    display: block;
    width: 376px;
    height: 210px;
  }
  .text {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    span {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      line-height: 20px;
    }
    .line {
      display: inline-block;
      width: 2px;
      height: 14px;
      margin: 0 6px;
      background-color: #fff;
    }
  }
}
</style>