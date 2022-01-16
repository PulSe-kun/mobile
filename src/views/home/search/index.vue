<template>
  <div class="searchPage">
    <van-search
      v-model.trim="iptVal"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @input="iptEvents"
    />
    <!-- 默认展示部分 -->
    <div class="default" v-if="current == 'init'">
      <div>
        <p>历史记录</p>
        <van-icon name="delete-o" @click="del" size="20" />
        <ul>
          <li v-for="item in initDate.historyData" :key="item.id" @click="goInfo(item.keyword)">
            {{ item.keyword }}
          </li>
        </ul>
      </div>
      <div class="hot">
        <p>热门搜索</p>
        <ul>
          <li v-for="(item, index) in initDate.hotKeywordList" :key="index">
            {{ item.keyword }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索商品列表 -->
    <div class="list" v-else-if="current == 'list'">
      <ul>
        <li
          v-for="item in searchkeyWords"
          :key="item.id"
          @click="choose(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 点击展示的对应商品 -->
    <div class="goods" v-else>
      <div class="title">
        <span>综合</span>
        <span>价格</span>
        <span>分类</span>
      </div>
      <ul>
        <li
          class="item"
          v-for="item in goodsList"
          :key="item.id"
        >
          <div><img :src="item.list_pic_url" alt="" /></div>
          <p>{{ item.name }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  helperaction,
  indexaction,
  addhistoryaction,
  clearhistoryAction,
} from "@/api/home/search";
export default {
  data() {
    return {
      iptVal: "", //注意输入框需要清除前后空格
      //⚡定义3种状态  通过current 控制这三部分的显示和隐藏
      //default 默认状态 ;List 商品列表 ;goods 点击对应的商品展示
      current: "init",
      initDate: {},
      searchkeyWords: [],
      goodsList: [],
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      indexaction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        this.initDate = res;
      });
    },
    //确定,搜索时触发
    onSearch() {
      console.log("变化");
    },
    //取消,返回
    onCancel() {
      this.$router.go(-1);
    },
    //清空搜索历史记录
    del() {
      //console.log("点击了");
      clearhistoryAction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        this.init()
      });
    },
    //输入框内容变化时触发
    iptEvents() {
      if (this.iptVal) {
        this.current = "list";
        helperaction({
          keyword: this.iptVal,
          order: "",
        }).then((res) => {
          console.log(res);
          this.searchkeyWords = res.keywords;
        });
      } else {
        this.current = "init";
        indexaction({
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          // console.log(res);
          this.initDate = res;
        });
      }
    },
    // 选择出来的商品列表
    choose(val) {
      // 需要传递参数
      this.current = "goods"; //赋值 对应商品
      helperaction({
        keyword: val, //⚡就是item.name
        order: "",
      }).then((res) => {
        console.log(res);
        this.goodsList = res.keywords;
      });
      addhistoryaction({
        keyword: val,
        openId: localStorage.getItem("openId"),
      });
    },
    goInfo(val) {
       // 需要传递参数
      this.current = "goods"; //赋值 对应商品
      helperaction({
        keyword: val, //⚡就是item.name
        order: "",
      }).then((res) => {
        console.log(res);
        this.goodsList = res.keywords;
      });
      addhistoryaction({
        keyword: val,
        openId: localStorage.getItem("openId"),
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
