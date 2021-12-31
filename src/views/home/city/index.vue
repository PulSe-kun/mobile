<template>
  <div class="city">
    <van-search v-model.trim="iptVal" placeholder="请输入搜索关键词" />
    <ul>
      <li v-for="item in cityList" :key="item.id" @click="goHome(item)">
        {{ item.name }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址:{{ item.address }}
      </li>
    </ul>
    <p>显示当前位置:</p>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iptVal: "",
      city: "",
      cityList: [],
    };
  },
  watch: {
    iptVal(val) {
      //👉_this只是一个变量名，this代表父函数，如果在子函数还用this，this的指向就变成子函数了，_this就是用来存储指向的。
      var _this = this;
      //输入提示插件
      AMap.plugin("AMap.AutoComplete", function () {
        var autoOptions = {
          //city 限定城市，默认全国
          city: _this.city,
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          _this.cityList = result.tips;
        });
      });
    },
  },
  created() {},
  mounted() {
    //获取当前定位城市数据
    //如果vuex有数据 地图中应展示为vuex的数据
    var cityInfo = this.$store.state.cityInfo; //vuex里面的数据
    if (cityInfo.name) {
      var map = new AMap.Map("container", {
        zoom: 16,
        //👉注意经纬度 需要(经度lng,纬度lat)
        center: [cityInfo.location.lng,cityInfo.location.lat], //中心点坐标
      });
      var marker = new AMap.Marker({
        position: [cityInfo.location.lng,cityInfo.location.lat], //位置
      });
      map.add(marker); //添加到地图
      return;
    }
    var map = new AMap.Map("container", {
      zoom: 10,
    });
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
  methods: {
    goHome(val) {
      this.$store.commit("editCityInfo", val);
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped lang="scss">
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 300px;
}
.city {
  ul {
    background-color: #fff;
    li {
      padding-top: 10px;
      padding-left: 12px;
    }
  }
  p {
    padding: 12px;
    font-size: 12px;
    font-weight: bold;
    background-color: #fff;
    color: rgb(0,0,0);
  }
}
</style>