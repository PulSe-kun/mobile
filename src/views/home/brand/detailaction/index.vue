<template>
  <div class="detail">
    <div class="banner">
      <img :src="list.list_pic_url" alt="" />
      <div class="desc">
        <p class="info">{{ list.name }}</p>
      </div>
    </div>
    <p class="text">{{ list.simple_desc }}</p>
    <div class="list" v-if="goods.length > 0">
      <!-- 地址栏传参 -->
      <div
        class="item"
        v-for="item in goods"
        :key="item.id"
      >
        <img :src="item.list_pic_url" alt="" />
        <p>{{ item.name }}</p>
        <p class="price">{{ item.retail_price }}￥</p>
      </div>
    </div>
    <div class="data" v-else>数据库暂无数据...</div>
  </div>
</template>

<script>
import { detailaction } from "@/api/home/brand/detailaction";
export default {
  data() {
    return {
      list: {},
      goods:[]
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      detailaction({
        id: this.$route.query.id,
      }).then((res) => {
        console.log(res);
        this.list = res.data;
        this.goods=res.goodsList
      });
    },
  },
};
</script>

<style scoped lang="scss">
.detail {
  .banner {
    width: 100%;
    height: 145px;
    position: relative;
    img {
      width: 375px;
      height: 100%;
    }
    .desc {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      .info {
        font-size: 0.50667rem;
        color: #fff;
        border-bottom: 0.06667rem solid #fff;
        padding: 0.06667rem;
      }
    }
  }
  .text {
    background: #fff;
    padding: 0.56rem 0.42667rem;
    font-size: 0.4rem;
    color: #666;
    text-align: center;
    margin-bottom: 8px;
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
        padding: 2px 0 10px;
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
  .data {
    font-size: 16px;
    text-align: center;
    color: #999;
    margin-top: 50px;
  }
}
</style>