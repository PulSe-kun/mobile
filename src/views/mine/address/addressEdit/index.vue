<template>
  <div class="edit">
    <!-- <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @change-default="onChangeDefault"
      @change-area="getAddress"
    /> -->
    <van-cell-group>
      <van-field
        v-model="addUser.userName"
        label="姓名"
        placeholder="请输入姓名"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="addUser.telNumber"
        type="tel"
        label="手机号"
        placeholder="请输入手机号码"
      />
    </van-cell-group>
    <van-cell-group @click.native="show = !show">
      <van-field
        v-model="addUser.address"
        label="地址"
        placeholder="省份、城市、区"
        readonly
      />
    </van-cell-group>
    <van-popup position="bottom" v-model="show">
      <van-area
        @confirm="getAddress"
        @cancel="onCancel"
        title="标题"
        :area-list="areaList"
      />
    </van-popup>
    <van-cell-group>
      <van-field
        v-model="addUser.detailadress"
        label="详细地址"
        placeholder="请输入详细地址"
      />
    </van-cell-group>
    <div class="select">
      <van-checkbox
        v-model="addUser.checked"
        shape="square"
        checked-color="#b4282d"
        >设置为默认地址</van-checkbox
      >
    </div>
    <van-button @click="save" type="primary" color="#b4282d" block
      >保存</van-button
    >
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import { detailAction, saveAction } from "@/api/mine/address";
export default {
  data() {
    return {
      addUser: {
        userName: "",
        telNumber: "",
        address: "",
        detailadress: "", //详细地址
        checked: false, //是否默认选中
        addressId: this.$route.query.id ? this.$route.query.id : "",
        openId: localStorage.getItem("openId"),
      },
      areaList,
      show: false,
    };
  },

  created() {
    // this.init();
    var id = this.$route.query.id; //判断新增还是修改
    if (id) {
      detailAction({
        id,
      }).then((res) => {
        console.log(res);
        this.addUser.address = res.data.address;
        this.addUser.checked = res.data.is_default ? true : false;
        this.addUser.detailadress = res.data.address_detail;
        this.addUser.telNumber = res.data.mobile;
        this.addUser.userName = res.data.name;
      });
    }
  },
  methods: {
    // 地区弹出层取消按钮
    onCancel() {
      this.show = false;
    },
    // 保存
    save() {
      saveAction(this.addUser);
      this.$router.push("/mine/address");
    },
    getAddress(e) {
      // console.log(e);
      var address = e.map((ele) => {
        return ele.name;
      });
      console.log(address.join(" "));
      this.addUser.address = address.join(" ");
      this.show = !this.show;
    },

    /* //保存
    onSave(e) {
      console.log(e);
      Toast("save");
    },
    //删除
    onDelete() {
      Toast("delete");
    },
    // 修改详细地址时触发
    onChangeDetail() {},
    // 切换是否使用默认地址时触发
    onChangeDefault() {}, */
  },
};
</script>

<style scoped lang="scss">
.edit {
  height: calc(var(--vh, 1vh) * 100 - 46px);
  background-color: #fff;
  // ::v-deep .van-button--danger {
  //   background-color: #b4282d;
  // }
  .select {
    padding-top: 20px;
    margin-left: 20px;
  }
  .van-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
