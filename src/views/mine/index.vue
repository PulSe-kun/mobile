<template>
  <div class="mine">
    <div class="header">
      <img src="/images/preview.jpg" alt="" />
      <p>用户</p>
    </div>
    <ul>
      <li>我的订单</li>
      <li>优惠卷</li>
      <li>我的足迹</li>
      <li>
        <router-link to="/mine/collect" style="color: #333">
          我的收藏
        </router-link>
      </li>
      <li>
        <router-link to="/mine/address" style="color: #333">
          地址管理
        </router-link>
      </li>
      <li>联系客服</li>
      <li>帮助中心</li>
      <li>
        <router-link to="/mine/actions" style="color: #333">
          意见反馈
        </router-link>
      </li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
