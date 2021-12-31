<template>
  <div class="home">
    <!-- 顶部 -->
    <div class="header">
      <p class="place">
        <router-link to="/home/city" style="color: #333">{{
          city
        }}</router-link>
      </p>
      <p class="search">
        <router-link to="/home/search">
          <van-cell-group :border="false">
            <van-field left-icon="search" placeholder="商品搜索" />
          </van-cell-group>
        </router-link>
      </p>
    </div>
    <!-- banner 轮播 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerInfo.banner" :key="item.id">
          <img :src="item.image_url" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 频道列表 -->
    <div class="channel">
      <ul>
        <router-link tag="li" :to="`/category/categoryList/${item.id}`" v-for="item in bannerInfo.channel" :key="item.id">
          <van-icon :name="item.icon_url" size="30"/>
          <p>{{item.name}}</p>
        </router-link>
      </ul>
    </div>
    <!-- 品牌展示 -->
    <div class="band">
      <p class="title">
        <router-link to="/home/brand" style="color: #333">
          品牌制造商直供
        </router-link>
      </p>
      <ul>
        <router-link tag="li" :to="`/home/brand/detailaction?id=${item.id}`" v-for="item in bannerInfo.brandList" :key="item.id">
          <div class="text">
            <p>{{ item.name }}</p>
            <p>{{ item.floor_price }}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="" />
        </router-link>
      </ul>
    </div>
    <!-- 新品首发 -->
    <div class="newGoods">
      <div class="top">
        <!-- 👉设置不同id进行判断 传参数 -->
        <router-link to="/home/goods?id=1">
          <div class="center">
            <p>新品首发</p>
            <p>查看全部</p>
          </div>
        </router-link>
      </div>
      <ul class="list">
        <router-link tag="li" :to="`/info?id=${item.id}`" v-for="item in bannerInfo.newGoods" :key="item.id">
          <img :src="item.list_pic_url" alt="" />
          <p class="title">{{ item.name }}</p>
          <p class="info">{{ item.goods_brief }}</p>
          <p class="price">{{ item.retail_price }}￥</p>
        </router-link>
      </ul>
    </div>
    <!-- 人气好物 -->
    <div class="hotGoods">
      <div class="top">
        <router-link to="/home/goods?id=2">
          <div class="center">
            <p>人气推荐 · 好物精选</p>
            <p>查看全部</p>
          </div>
        </router-link>
      </div>
      <ul class="list">
        <router-link tag="li" :to="`/info?id=${item.id}`" v-for="item in bannerInfo.hotGoods" :key="item.id">
          <img :src="item.list_pic_url" alt="" />
          <p class="title">{{ item.name }}</p>
          <p class="info">{{ item.goods_brief }}</p>
          <p class="price">{{ item.retail_price }}￥</p>
        </router-link>
      </ul>
    </div>
    <!-- 专题精选 -->
    <div class="topic">
      <div class="title">
        专题精选
        <span></span>
      </div>
      <ul class="topicList">
        <li v-for="item in bannerInfo.topicList" :key="item.id">
          <img :src="item.item_pic_url" alt="" />
          <div>
            <span class="desc">{{ item.title }}</span>
            <span class="price">{{ item.price_info }}元起</span>
          </div>
          <p class="info">{{ item.subtitle }}</p>
        </li>
      </ul>
    </div>
    <!-- 居家好物... -->
    <div
      class="houseware"
      v-for="item in bannerInfo.newCategoryList"
      :key="item.id"
    >
    <p>{{item.name}}好物</p>
      <ul>
        <router-link tag="li" :to="`/info?id=${item.id}`" class="item" v-for="(item,index) in item.goodsList" :key="index">
          <div><img :src="item.list_pic_url" alt="" /></div>
          <p>{{ item.name }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </router-link>
        <router-link tag="li" class="item" :to="`/category/categoryList/${item.id}`">
          <p class="text">{{item.name}}好物</p>
          <div>
            <img class="icon" src="/images/rightbig.png" alt="">
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { index } from "@/api/home";
export default {
  name: "",
  data() {
    return {
      bannerInfo: {},
      city: "",
    };
  },
  created() {
    index().then((res) => {
      //👉注意 $router 路由实例,用于页面跳转; $route 当前路由对象,获取当前页面路径,传递参数
      //获取数据
      console.log(res);
      //赋值操作
      this.bannerInfo = res;
    });
  },
  components: {},
  mounted() {
    /* var map = new AMap.Map("container", {
      zoom: 11, //级别
      center: [116.397428, 39.90923], //中心点坐标
      viewMode: "3D", //使用3D视图
    });
    //点标记
    var marker = new AMap.Marker({
      position: [116.39, 39.9], //位置
    });
    map.add(marker); //添加到地图 */

    //⚡进入home页面,获取定位
    // AMap.PlaceSearch 插件获取当前位置
    // 从city页面传递过来的城市数据
    //👉需要判断 如果vuex 中保存的有city的数据 优先使用vuex的数据
    var cityInfo = this.$store.state.cityInfo; //vuex里面的数据
    if (cityInfo.name) {
      this.city = cityInfo.name;
      return;
    }
    //IP定位获取当前城市信息
    var _this = this;
    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          //console.log(result);
          _this.city = result.city;
        }
      });
    });
  },
  methods: {},
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
