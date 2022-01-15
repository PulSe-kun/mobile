<template>
  <div id="app">
    <!-- 底部标签栏 -->
    <van-tabbar route active-color="rgb(195, 85, 89)" v-if="tapShow">
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/topic" icon="description"
        >专题</van-tabbar-item
      >
      <van-tabbar-item replace to="/category" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="friends-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <!-- 顶部导航栏 -->
    <van-nav-bar
      class="navBar"
      v-if="navShow"
      title="不凡商城"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <!-- :key="$route.query.id" -->
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view> 
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 回到顶部按钮 -->
    <van-button
      type="info"
      class="backTop"
      color="#b0b0b0"
      plain
      round
      size="small"
      @click="backTop"
      icon="arrow-up"
      v-if="showgo"
    >
    </van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tapShow: true, //底部
      showgo: false,
      navShow: false, //顶部
    };
  },
  //👍监听$route 只要路由发生改变 就会触发
  watch: {
    $route: function (to, from) {
      // console.log("触发watch监听", to, from);
      var pathArr = ["/home", "/topic", "/category", "/cart", "/mine"];
      if (pathArr.includes(to.path)) {
        this.tapShow = true; //路径包含显示
        this.navShow = false;
      } else {
        this.tapShow = false; //不包含隐藏
        this.navShow = true;
      }
    },
  },
  created() {
    var userInfo = {
      //用户唯一标识
      openId: "18251960898",

      nickName: "厉飞雨",

      avatarUrl:
        "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
    };

    var openId = userInfo.openId;
    //本地存储
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    localStorage.setItem("openId", openId);
  },
  mounted() {
    var vm = this;
    window.onscroll = function () {
      if (document.documentElement.scrollTop > 100) {
        vm.showgo = true;
      } else {
        vm.showgo = false;
      }
    };
    //当页面加载时，将高度设置为window.innerHeight将正确地将高度设置为窗口的可见部分。
    // 如果地址栏是可见的，那么window.innerHeight是全屏的高度。
    // 如果地址栏是隐藏的，那么window.innerHeight将是屏幕可见部分的高度。
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      console.log(vh);
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  },
  methods: {
    backTop() {
      scrollTo(0, 0);
    },
    goBack() {
      this.$router.go(-1); //👉返回上一级 注意vant navBar用它给的事件 @click-left/@click-right
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
* {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body,
html {
  background: #f4f4f4;
  height: 100%;
}
.backTop {
  position: fixed !important;
  bottom: 60px;
  left: 280px;
  z-index: 100;
  opacity: 0.5;
}
.navBar {
  .van-icon,
  .van-nav-bar__text {
    color: rgb(195, 85, 89) !important;
  }
}
</style>
