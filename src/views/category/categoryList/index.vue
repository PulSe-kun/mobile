<template>
  <div class="categoryList">
    <van-tabs v-model="active" @click="toggle">
      <!-- 👉通过名称匹配 -->
      <!-- ⚡注意:写在组件上的事件 是组件内部提供的自定义事件 -->
      <van-tab
        :title="item.name"
        :name="item.name"
        v-for="item in navData"
        :key="item.id"
      ></van-tab>
    </van-tabs>
    <div class="top">
      <p>{{ currentNav.name }}</p>
      <p>{{ currentNav.front_desc }}</p>
    </div>
    <div class="list" v-if="list.length > 0">
      <!-- 地址栏传参 -->
      <router-link
        tag="div"
        :to="`/info?id=${item.id}`"
        class="item"
        v-for="item in list"
        :key="item.id"
      >
        <img :src="item.list_pic_url" alt="" />
        <p>{{ item.name }}</p>
        <p class="price">{{ item.retail_price }}￥</p>
      </router-link>
    </div>
    <div class="info" v-else>数据库暂无数据...</div>
  </div>
</template>

<script>
import { categoryNav, goodsList } from "@/api/category/categoryList";
export default {
  data() {
    return {
      navData: [],
      active: "",
      list: [],
      currentNav: {},
    };
  },
  computed: {},
  created() {
    // console.log(this.$route.params.id);
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      categoryNav({
        id: this.$route.params.id,
      }).then((res) => {
        console.log(res);
        this.navData = res.navData;
        this.active = res.currentNav.name;
      });
      goodsList({
        categoryId: this.$route.params.id,
      }).then((res) => {
        console.log(res);
        this.list = res.data;
        this.currentNav = res.currentNav;
      });
    },
    //切换导航 list数据变更
    toggle(name, title) {
      //👉匹配查找
      var item = this.navData.find((ele) => ele.name == name);
      goodsList({
        categoryId: item.id,
      }).then((res) => {
        //console.log(res);
        this.list = res.data;
        this.currentNav = res.currentNav;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.categoryList {
  .top {
    text-align: center;
    background: #fff;
    padding: 30px 0;
    margin-top: 8px;
    margin-bottom: 2px;
    p:first-child {
      margin-bottom:10px;
      font-size: 15px;
      color: #333;
    }
    p:last-child {
      height: 12px;
      font-size: 12px;
      color: #999;
    }
  }
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 49.8%;
      font-size: 10px;
      background-color: #fff;
      margin-bottom: 2px;
      padding: 10px 0;
      img {
        display: block;
        width: 152px;
        height: 152px;
        margin: 0 auto;
      }
      p {
        width: 86%;
        font-size: 12px;
        text-align: center;
        padding: 2px 0px 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;
        margin: 0 auto;
      }
      .price {
        font-size: 16px;
        color: rgb(195, 85, 89);
      }
    }
  }
  .info {
    text-align: center;
    color: #999;
    margin-top: 50px;
  }
  
}
  ::v-deep .van-tabs__line{
    background-color: rgb(195, 85, 89);
  }
</style>