<template>
  <div class="order">
    <div class="line"></div>
    <div class="person" @click="goAddress">
      <p class="name">{{ addressInfo.name }}</p>
      <div class="info">
        <p>{{ addressInfo.mobile }}</p>
        <p>{{ addressInfo.address }}</p>
      </div>
      <div class="icon">
        <van-icon name="arrow" size="15" color="#b0b0b0" />
      </div>
    </div>
    <!-- 商品合计 -->
    <div class="box">
      <div class="item">
        <span>商品合计</span>
        <span>￥{{ orderList.allPrise }}</span>
      </div>
      <div class="item">
        <span>运费</span>
        <span>免运费</span>
      </div>
      <div class="item">
        <span>优惠券</span>
        <span>暂无</span>
      </div>
    </div>
    <!-- 商品清单 -->
    <ul class="orderList">
      <li class="order-item" v-for="item in orderList.goodsList" :key="item.id">
        <div class="center">
          <div class="left">
            <img :src="item.list_pic_url" alt="" />
            <div class="info">
              <p>{{ item.goods_name }}</p>
              <p>￥{{ item.retail_price }}</p>
            </div>
          </div>
          <div class="right">
            <p>x{{ item.number }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="tap">
      <p>实付:￥{{ orderList.allPrise }}</p>
      <p class="buy" @click="buy">支付</p>
    </div>
  </div>
</template>

<script>
import { detailAction } from "@/api/cart/order";
export default {
  data() {
    return {
      orderList: [],
      addressInfo: {},
    };
  },
  computed: {},
  created() {
    //解析操作
    var address = JSON.parse(localStorage.getItem("address"));
    if (address && address.id) {
      this.addressInfo = address;
    }
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      detailAction({
        openId: localStorage.getItem("openId"),
        addressId: "",
      }).then((res) => {
        console.log(res);
        this.orderList = res;
      });
    },
    buy() {
      this.$toast.fail("支付功能暂未开发");
    },
    goAddress() {
      this.$router.push("/mine/address");
    },
  },
};
</script>

<style scoped lang="scss">
.order {
  .line {
    background: url(~@/assets/address-bg-bd.png) repeat-x #fff;
    padding: 25px 0 15px 0;
  }
  .person {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    padding: 10px 2px;
    margin-bottom: 10px;
    .name {
      font-size: 14px;
      width: 50px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      align-self: flex-start;
    }
    .info {
      padding: 0 0.26667rem;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      p:last-child {
        margin-top: 10px;
        color: #666;
      }
    }
    .icon {
      width: 0.66667rem;
      height: 0.66667rem;
      margin: 0 0.26667rem;
    }
  }
  .box {
    padding: 0 0.4rem;
    background: #fff;
    .item {
      padding: 0.4rem 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .orderList {
    background: #fff;
    margin-bottom: 1.46667rem;
    margin-top: 0.26667rem;
    .order-item {
      padding: 0.26667rem 0;
      border-bottom: 1px solid #f4f4f4;
      position: relative;
      .center {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.3s ease;
        .left {
          display: flex;
          align-items: center;
          width: 80%;
          img {
            height: 1.66667rem;
            width: 1.66667rem;
            display: block;
            background: #f4f4f4;
            margin-left: 0.26667rem;
          }
          .info {
            width: 50%;
            padding: 10px;
            p {
              line-height: 20px;
              padding: 8px;
            }
          }
        }
        .right {
          padding-right: 25px;
        }
      }
    }
  }
  .tap {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    text-align: center;
    p:first-child {
      float: left;
      width: 80px;
    }
    .buy {
      font-size: 14px;
      float: right;
      width: 120px;
      color: #fff;
      background-color: #b4282d;
    }
  }
}
</style>