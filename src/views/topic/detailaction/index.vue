<template>
  <div class="topicList">
    <div class="main" v-html="list.content"></div>
    <p class="title">专题推荐</p>
    <div class="list">
      <div class="item" v-for="item in recommendList" :key="item.id">
        <img :src="item.scene_pic_url" alt="" />
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { detailaction } from "@/api/topic/detailaction";
export default {
  data() {
    return {
      list: {},
      recommendList: [],
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
        this.recommendList = res.recommendList;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.topicList {
  padding-bottom: 20px;
  ::v-deep img {
    display: block;
    width: 100%;
  }
  .title {
    text-align: center;
    background: #f4f4f4;
    font-size: 0.4rem;
    color: #999;
    padding: 0.4rem 0;
  }
  .list {
    width: 9.2rem;
    height: auto;
    margin: 0 0.4rem;
    .item {
      width: 100%;
      padding: 0.32rem 0.32rem 0.4rem 0.32rem;
      margin-bottom: 0.4rem;
      background: #fff;
      box-sizing: border-box;
      img{
        display: block;
        width: 321px;
        height: 150px;
      }
      p{
        text-align: center;
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
}
</style>