<template>
  <div class="address">
    <div class="list">
      <div class="person" v-for="item in list" :key="item.id">
        <div>
          <p class="name">{{ item.name }}</p>
          <p class="default" v-if="item.is_default != 0 ? true : false">默认</p>
        </div>
        <div class="info" @click="goOrder(item)">
          <p>{{ item.mobile }}</p>
          <p>{{ item.address }}</p>
        </div>
        <div class="icon" @click="edit(item.id)"></div>
        <div class="delete"  @click="del(item.id)" >
          <van-icon name="delete-o" size="26px"/>
        </div>
      </div>
    </div>
    <van-button @click="goAddAddress" type="primary" color="#b4282d" plain block
      >新建地址
    </van-button>
  </div>
</template>

<script>
import { getListAction, deleteAction } from "@/api/mine/address";

export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  // watch: {
  //   $route() {
  //
  //   },
  // },
  computed: {},
  created() {
    this.init();
  },
  mounted() {
    this.init()
  },
  // activated() {
  //   this.init()
  // },
  methods: {
    init() {
      getListAction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        this.list = res.data;
      });
    },
    //根据条件添加类名
    // active() {
    //   return this.list.is_default == 1 ? "default" : "";
    // },
    // onAdd() {
    //    this.$toast('新增地址');
    // },
    // onEdit(item, index) {
    //    this.$toast('编辑地址:' + index);
    // },
    //
    //回到我的
    // goAddress() {
    //   this.$router.push("/mine");
    // },
    //编辑
    edit(id) {
      this.$router.push(`/mine/address/addressEdit?id=${id}`);
    },
    //订单地址选中
    goOrder(item) {
      localStorage.setItem("address", JSON.stringify(item));
      // 注意:⚡push 跳转页面 会向历史记录中添加一条历史记录
      // this.$router.push("/cart/order")
      this.$router.go(-1);
    },
    goAddAddress() {
      this.$router.push("/mine/address/addressEdit");
    },
    del(id) {
      deleteAction({
        id,
      }).then((res) => {
        console.log(res);
        this.init();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.address {
  margin-bottom: 2px;

  .list {
    background-color: #fff;
    height: calc(var(--vh, 1vh) * 100 - 46px);

    .person {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      align-items: center;
      padding: 20px 2px;
      border-bottom: 1px solid #d9d9d9;

      .name {
        font-size: 12px;
        width: 50px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        align-self: flex-start;
      }

      .default {
        width: 30px;
        height: 15px;
        border: 1px solid #b4282d;
        text-align: center;
        line-height: 15px;
        color: #b4282d;
        margin: 5px auto 0 auto;
      }

      .info {
        padding-left: 20px;
        flex: 1;
        overflow: hidden;

        p:last-child {
          margin-top: 10px;
          color: #666;
        }
      }

      .icon {
        background: url("~@/assets/edit.png") no-repeat;
        background-size: cover;
        width: 25px;
        height: 25px;
        margin: 0 10px;
      }

      .delete {
        width: 40px;
      }
    }
  }

  .van-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>