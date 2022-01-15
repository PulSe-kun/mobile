<template>
  <div class="goods">
    <div class="banner">
      <img src="/images/newgoods.png" alt="" />
    </div>
    <div class="nav">
      <span :class="complex != 'default' ? 'active' : ''" @click="changeComplex"
        >综合</span
      >
      <span :class="currentStatus != 'default' ? 'active' : ''" @click="sort"
        >价格</span
      >
      <span :class="type != 'default' ? 'active' : ''" @click="changeType"
        >分类</span
      >
      <div class="icon" @click="sort">
        <van-icon
          name="arrow-up"
          :color="
            currentStatus == 'up' ? 'rgb(195, 85, 89)' : 'rgb(203,203,203)'
          "
        />
        <van-icon
          name="arrow-down"
          :color="
            currentStatus == 'down' ? 'rgb(195, 85, 89)' : 'rgb(203,203,203)'
          "
        />
      </div>
    </div>
    <ul>
      <li
        class="item"
        v-for="item in goodsList"
        :key="item.id"
        @click="show(item.name)"
      >
        <div><img :src="item.list_pic_url" alt="" /></div>
        <p>{{ item.name }}</p>
        <p class="price">￥{{ item.retail_price }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { goodsList } from "@/api/home/goods";

export default {
  data() {
    return {
      goodsList: [],
      //👉控制颜色是否添加
      currentStatus: "default", //default up down
      order: "", //排序asc 价格从小到大展示 desc 价格从大到小展示
      complex: "default", //default或者不是默认
      type: "default",
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      var id = this.$route.query.id;
      goodsList({
        isHot: id == 2 ? 1 : "", //人气推荐与好物精选 id 2 否则传递空值
        isNew: id == 1 ? 1 : "", //新品首发 id 1 否则传递空值
        order: this.order,
      }).then((res) => {
        console.log(res);
        this.goodsList = res.data;
      });
    },
    sort() {
      this.complex = "default";
      this.type == "default";
      if (this.currentStatus == "default") {
        //⚡当处于灰色的初始状态的时候让向上箭头展示红色
        this.currentStatus = "up";
        // 价格从小到大展示
        this.order = "asc";
      } else if (this.currentStatus == "up") {
        // 等状态为向上的时候 点击切换成向下
        this.currentStatus = "down";
        // 价格从大到小展示
        this.order = "desc";
      } else {
        //等状态为向下的时候 点击切换成向上
        this.currentStatus = "up";
        // 价格从小到大展示
        this.order = "asc";
      }
      this.init();
    },
    // 综合
    changeComplex() {
      this.currentStatus = "default";
      this.type = "default";
      if (this.complex == "default") {
        this.complex = "";
        this.order = "";
      } else if (this.complex == "") {
        this.complex = "default";
      }
      this.init();
    },
    // 分类
    changeType() {
      this.currentStatus = "default";
      this.complex = "default";
      if (this.type == "default") {
        this.type = "";
        this.order = "";
      } else if (this.type == "") {
        this.type = "default";
      }
      this.init();
    },
  },
};
</script>

<style scoped lang="scss">
.goods {
  position: relative;
  .banner {
    img {
      width: 100%;
      display: block;
      height: 144px;
    }
  }
  .nav {
    display: flex;
    justify-content: space-around;
    height: 36px;
    line-height: 38px;
    background-color: #fff;
    margin-bottom:8px;
    font-weight:bold;
    .icon {
      display: flex;
      flex-direction: column; //⚡主轴为垂直方向，起点在上沿。
      position: absolute;
      top: 150px;
      left: 205px;
      z-index: 10;
    }
  }
  .active {
    color: rgb(195, 85, 89);
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 49.8%;
      font-size: 10px;
      background-color: #fff;
      margin-bottom: 2px;
      img {
        width: 100%;
      }
      p {
        text-align: center;
        padding: 2px 0px 10px;
      }
      .price {
        font-size: 16px;
        color: rgb(195, 85, 89);
      }
    }
  }
}
</style>