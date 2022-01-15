<template>
  <div class="collect">
    <div class="header">
      <p>我的收藏</p>
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
    <div class="info" v-else>暂无收藏数据...</div>
  </div>
</template>

<script>
import { listAction } from "@/api/mine/collect";
export default {
  data() {
    return {
        list:[]
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
        //收藏列表数据
      listAction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        this.list=res.collectGoodsList
      });
    },
  },
};
</script>

<style scoped lang="scss">
.collect {
  .header {
    padding: 0.26667rem 0;
    text-align: center;
    background: #fff;
    margin-bottom: 0.06667rem;
    font-size: 0.48rem;
    font-weight: 700;
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
    .info {
    text-align: center;
    color: #999;
    margin-top: 50px;
  }
  }
}
</style>