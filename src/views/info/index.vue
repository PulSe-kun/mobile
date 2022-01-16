<template>
  <div class="info">
    <!-- 轮播 -->
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in info.gallery" :key="item.id">
          <img :src="item.img_url" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
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
    <!-- 商品名称等内容 -->
    <div class="header">
      <!-- 👉注意报错 vue 在渲染的时候 首先会编译模板 -->
      <!-- 也可以用v-if v-if是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。-->
      <p>{{ info.info && info.info.name }}</p>
      <p>{{ info.info && info.info.goods_brief }}</p>
      <p>￥{{ info.info && info.info.retail_price }}</p>
    </div>
    <!-- 选择规格 数量 -->
    <div class="section">
      <van-cell is-link @click="showPopup">请选择规格数量</van-cell>
      <van-popup
        closeable
        position="bottom"
        :style="{ height: '30%' }"
        v-model="show"
      >
        <div class="card">
          <div class="left">
            <img :src="info.info && info.info.primary_pic_url" alt="" />
          </div>
          <div class="right">
            <p>价格￥{{ info.info && info.info.retail_price }}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <div class="stepper">
          <p>数量</p>
          <van-stepper v-model="value" />
        </div>
      </van-popup>
    </div>
    <!-- 商品参数 -->
    <div class="parameter">
      <p class="title">商品参数</p>
      <div class="info" v-for="(item, index) in info.attribute" :key="index">
        <p>{{ item.name }}:</p>
        <p>{{ item.value }}</p>
      </div>
    </div>
    <!-- 商品详情-->
    <div class="desc" v-html="info.info &&info.info.goods_desc">
      <!-- {{ info.info && info.info.goods_desc }} -->
    </div>
    <!-- 常见问题 -->
    <div class="issue">
      <div class="title">
        <p class="line"></p>
        <p class="text">常见问题</p>
        <p class="line"></p>
      </div>
      <div class="issueInfo" v-for="item in info.issue" :key="item.id">
        <div class="q-box">
          <p class="dot"></p>
          <p class="question">{{ item.question }}</p>
        </div>
        <p class="answer">{{ item.answer }}</p>
      </div>
    </div>
    <!-- 大家都在看list -->
    <div class="productList">
      <div class="title">
        <p class="line"></p>
        <p class="text">大家都在看</p>
        <p class="line"></p>
      </div>
      <div class="list">
        <!-- 地址栏传参 -->
        <div
          class="item"
          v-for="item in info.productList"
          :key="item.id"
          @click="refresh(item.id)"
        >
          <img :src="item.list_pic_url" alt="" />
          <p>{{ item.name }}</p>
          <p class="price">{{ item.retail_price }}￥</p>
        </div>
      </div>
    </div>
    <!-- 底部栏 -->
    <div class="footer">
      <ul>
        <li>
          <!-- ⚡vant 组件里面点击事件加native 实现原生点击事件 -->
          <van-icon
            @click.native="collected"
            :color="info.collected ? '#b4282d' : ''"
            name="star-o"
            size="24"
          />
        </li>
        <li>
          <router-link to="/cart">
            <van-icon
              :badge="info.allnumber"
              name="shopping-cart-o"
              size="24"
            />
          </router-link>
        </li>
        <li @click="showPopup">立即购买</li>
        <li @click="showPopup">加入购物车</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { detailaction, addcollect, addCart } from "@/api/info";
import { Toast } from "vant";

export default {
  data() {
    return {
      info: {},
      show: false,
      value: 1,
    };
  },
  // 解决复用组件 路由变化
  // 1.watch 监听 2.路由守卫 3.router-view绑定key(让vue不在复用对应组件)
  // watch: {
  //   $route(to, from) {
  //     detailaction({
  //       id: to.query.id,
  //       openId: localStorage.getItem("openId"),
  //     }).then((res) => {
  //       console.log(res);
  //       this.info = res;
  //     });
  //   },
  // },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    async init() {
      //商品详情
      var res = await detailaction({
        id: this.$route.query.id,
        openId: localStorage.getItem("openId"),
      });
      this.info = res;
    },
    // 收藏
    collected() {
      addcollect({
        goodsId: this.$route.query.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        //👉当接口调取成功之后
        //需初始化 再获取页面最新的数据
        this.init();
      });
    },
    //控制弹出层
    async showPopup() {
      //1.控制弹出层显示/隐藏
      // this.show = !this.show;
      //2.添加购物车
      if (this.show) {
        await addCart({
          goodsId: this.$route.query.id,
          number: this.value,
          openId: localStorage.getItem("openId"),
        });
        await this.init();
        Toast({
          type: "success",
          message: "添加成功",
          duration: 2000,
        });
      } else {
        this.show = !this.show;
      }
    },
    refresh(id) {
      // 4.再调取接口
      detailaction({
        id: id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        this.info = res;
      });
      // this.$router.push(`/info?id=${id}`);
    },
    getDesc() {
      var htmlStr = "";
      for (var i = 0; i < data.length; i++) {
        var itemData = data[i];
        htmlStr += `<p></p>
                <a href="${itemData.href}">
                    <div class="card">
                        <img class="icon" src="icon/${itemData.img}" alt="" class="icon">
                    </div>
                    <p class="title">${itemData.title}</p>
                    <p class="desc">${itemData.desc}</p>
                </a>
            </li>`;
      }
      ul.innerHTML = htmlStr;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>