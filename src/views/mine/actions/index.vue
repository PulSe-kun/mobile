<template>
  <div class="actions">
    <div class="header">
      <p>意见与反馈</p>
    </div>
    <van-field
      v-model="message"
      rows="4"
      autosize
      label="留言:"
      type="textarea"
      maxlength="150"
      placeholder="请输入你的意见和反馈"
      show-word-limit
    />
    <div>
      <van-cell-group>
        <van-field
          v-model="value"
          label="联系方式:"
          placeholder="邮箱/手机号/微信号"
        />
      </van-cell-group>
    </div>
    <button>提交</button>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
import { submitAction } from "@/api/mine";
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
.actions {
  width: 100%;
  // vh 相对屏幕的高度
  height: calc(var(--vh, 1vh) * 100 - 46px);
  background-color: #fff;
  .header {
    height: 36px;
    padding: 0 10px;
    p {
      font-size: 12px;
      line-height: 36px;
      border-bottom: 2px solid #d9d9d9;
    }
  }
  button {
    display: block;
    font-size: 16px;
    width: 90%;
    border: none;
    height: 50px;
    border-radius: 6px;
    background-color: #b4282d;
    color: #fff;
    margin: 0 auto;
    margin-top:50px
  }
  
}
</style>