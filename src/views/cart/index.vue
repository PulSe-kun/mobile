<template>
  <div class="cart">
    <!-- 优势服务 -->
    <div class="notice">
      <div>
        <img src="/images/dot.png" alt="" style="display: inline-block" />
        <span>30天无忧退货</span>
      </div>
      <div>
        <img src="/images/dot.png" alt="" style="display: inline-block" />
        <span>48小时快速退款</span>
      </div>
      <div>
        <img src="/images/dot.png" alt="" style="display: inline-block" />
        <span>满88元免邮费</span>
      </div>
    </div>
    <!-- 购物商品列表 -->
    <div class="list">
      <van-swipe-cell
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :before-close="beforeClose"
      >
        <div class="card">
          <div class="left">
            <van-checkbox
              v-model="item.isChecked"
              checked-color="rgb(180, 40, 45"
            >
            </van-checkbox>
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
        <template #right>
          <van-button
            class="delete-button"
            square
            type="danger"
            text="删除"
            @click.native="del(item.id)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <div class="tap">
      <van-checkbox v-model="isSelectedAll" checked-color="rgb(180, 40, 45">
        全选
      </van-checkbox>
      <div class="tap-right">
        <p>￥{{ total }}</p>
        <p class="buy" @click="buy">立即下单</p>
      </div>
    </div>
  </div>
</template>

<script>
import { cartList, deleteAction, submitAction } from "@/api/cart";
import { Toast } from "vant";

export default {
  data() {
    return {
      list: [],
      delList: [],
    };
  },
  computed: {
    //👉计算属性 当需要知道某些数据的变化;需要返回一个新的数据就用它
    isSelectedAll: {
      get() {
        // ⚡用于读取
        return this.list.every((ele) => ele.isChecked);
      },
      set(val) {
        // ⚡用于修改
        // false 控制列表项全部取消选中 为true 全部选中
        //console.log(val)
        this.list.forEach((ele) => {
          ele.isChecked = val;
        });
      },
    },
    total() {
      return this.list.reduce(function (total, current) {
        // total 上一次循环累加的结果
        // current 当次循环的数据
        if (current.isChecked) {
          // 商品选中之后才去计算商品总价
          return (total += current.retail_price * current.number);
        } else {
          return total;
        }
      }, 0);
    },
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      cartList({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        //手动添加属性操作
        res.data.forEach((ele) => {
          ele.isChecked = false;
        });
        this.list = res.data;
        // 👉赋值之后添加的数据不是响应式的数据 需要写在赋值之前
        // this.list.forEach(ele =>{
        //     ele.isChecked = true
        // })
      });
    },
    del(id) {
      //删除一项
      deleteAction({
        id,
      }).then((res) => {
        console.log(res);
      });
    },
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
      switch (position) {
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          //引入 Dialog 组件后，会自动在 Vue 的 prototype 上挂载 $dialog 方法，在所有组件内部都可以直接调用此方法。
          this.$dialog
            .confirm({
              message: "确定删除吗？",
            })
            .then(() => {
              Toast.success("删除成功");
              instance.close();
            });
          break;
      }
      this.init();
    },
    //立即下单
    buy() {
      submitAction({
        allPrise: this.total,
        goodsId: this.list
          .filter((ele) => ele.isChecked)
          .map((ele) => ele.goods_id)
          .join(","),
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        if (res.data) {
          this.$router.push("/cart/order");
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
