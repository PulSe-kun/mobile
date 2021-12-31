<template>
  <div class="category">
    <div class="header">
      <router-link to="/home/search" style="color: #333">
        <div class="input">
          <span><img src="/images/search.png" alt="" /></span>
          <span>商品搜索,共239款好物</span>
        </div>
      </router-link>
    </div>
    <div class="main">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          :title="item.name"
          v-for="item in list"
          :key="item.id"
          @click="changeItem(item.id)"
        />
      </van-sidebar>
      <div class="rightList">
        <div class="banner">
          <img :src="rightList.banner_url" alt="" />
        </div>
        <p class="text">—— {{rightList.name}}分类 ——</p>
        <div class="list">
          <!-- tag 可以自己定义的 -->
          <router-link
            :to="`/category/categoryList/${item.id}`"
            tag="div"
            style="color: #333"
            class="item"
            v-for="item in rightList.subList"
            :key="item.id"
          >
            <img :src="item.wap_banner_url" alt="" />
            <p>{{ item.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { indexaction, currentaction } from "@/api/category/";
export default {
  data() {
    return {
      list: [],
      activeKey: "",
      rightList: {},
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    //⚡注意ajax是异步操作
    //异步操作会等同步操作先走完
    /* init() {
      indexaction().then((res) => {
        console.log(res);
        this.list = res.categoryList;
        currentaction({
          id: this.list[0].id,
        }).then((res) => {
          console.log(res);
        });
      });
    }, */
    //async await
    //👍async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
    async init() {
      var res = await indexaction();
      this.list = res.categoryList;
      console.log(res);
      currentaction({
        id: this.list[0].id,
      }).then((res) => {
        console.log(res);
        this.rightList = res.data.currentOne;
      });
    },
    changeItem(id) {
      // 点击不同的item,切换 显示不同商品数据
      currentaction({
        id: id,
      }).then((res) => {
        console.log(res);
        this.rightList = res.data.currentOne;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
