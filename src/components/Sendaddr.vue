<template>
  <!-- 配送 地址 -->
  <div class="mask-box">
    <div class="mask" @click="close"></div>
    <transition name="van-slide-up">
      <div class="content-box" v-if="!isEdit">
        <div class="title">
          <p>配送地址</p>
          <van-icon
            name="plus"
            class="close"
            @click="
              isAdd = true;
            "
          />
        </div>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          @edit="onEdit"
          @select="onSelect"
          style="height:auto;padding-bottom:5px;"
        />

        <van-goods-action>
          <van-goods-action-big-btn primary text="取消" @click="close" />
        </van-goods-action>
      </div>
    </transition>
       <!-- 地址 修改 -->
    <Editaddress v-if="isEdit" :editAddress = "editAddr"/>
    <!-- 新增 地址 -->
    <Addaddress v-if="isAdd" />
  </div>
</template>

<script>
import Editaddress from "@/components/Editaddress.vue";
import Addaddress from "@/components/Addaddress.vue";
export default {
  name: "sendaddr",
  components: {
    Editaddress,
    Addaddress
  },
  data() {
    return {
      editAddr: {} /* 要修改的地址 */,
      isEdit: false,
      isAdd:false,
      chosenAddressId: 0,
      list: []
    };
  },
  methods: {
    onSelect(item, index) {
      /* 选择地址 */
      var _this = this;
      _this.chosenAddressId = item.id;
      _this.$emit("hideaddress", item);
      _this.list.forEach(function(once, ind) {
        if (index == ind) {
          once.isDefault = 1;
        } else {
          once.isDefault = 0;
        }
      });
      console.log(_this.list);
    },
    close() {
      var _this = this;
      _this.$emit("hideaddress");
    },

    onEdit(item, index) {
      // 编辑地址
      var _this = this;
      console.log(item);
      _this.isEdit = true;
      _this.editAddr = item;
    }
  },
  created() {
    var _this = this;
    /* 获取地址列表 */
    _this.axios
      .get("/kplapi/mine/addressList?")
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        if (res.data.code == 1) {
          if (body.length <= 0) {
            _this.$toast("亲，您需要添加配送地址哦");
          } else {
            body.forEach(function(item, index) {
              var obj = {};
              var isdefault;
              if (item.if_default == 1) {
                _this.chosenAddressId = item.id;
                isdefault = true;
              } else {
                isdefault = false;
              }
              obj["id"] = item.id;
              obj["name"] = item.user_name;
              obj["tel"] = item.user_phone;
              obj["address"] = item.detail_addr;
              obj["province"] = item.province;
              obj["city"] = item.city;
              obj["county"] = item.county;
              obj["isDefault"] = isdefault;
              obj["detail_addr"] = item.detail_addr;
              obj["town"] = item.town;
              obj["provinceId"] = item.province_id;
              obj["cityId"] = item.city_id;
              obj["countyId"] = item.county_id;
              obj["townId"] = item.town_id;
              _this.list.push(obj);
            });
            console.log(_this.list)
          }
        } else {
          _this.$toast(res.data.msg);
        }
      })
      .catch(function(err) {
        _this.$toast("亲，系统正在开小差哟");
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.van-address-list__add {
  display: none;
}
.van-switch--on {
  background-color: #6d1786 !important;
}
.van-address-item .van-radio__icon--checked .van-icon {
  border-color: #6d1786;
  background-color: #6d1786;
}
.van-button--danger {
  background: #6d1786;
  border: 0;
}
.van-button--warning {
  background-color: #fcb632;
  border: 0;
}

.tip-name {
  font-size: 14px;
  color: #404040;
  font-family: MicrosoftYaHei;
  margin-bottom: 15px;
}
.checked-stand {
  color: #6d1786 !important;
  border: 1px solid #6d1786 !important;
  background: #fff !important;
}
.mask-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  transition: all 200ms;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .content-box {
    position: absolute;
    width: 100%;
    height: 50%;
    background: #fff;
    border-radius: 9px 9px 0 0;
    bottom: 0;
    left: 0;
    padding: 19px 15px 50px;
    overflow-y: auto;
    overflow-x: hidden;
    .title {
      position: relative;
      margin-bottom: 15px;
      p {
        font-size: 15px;
        color: #404040;
        text-align: center;
      }
      .close {
        position: absolute;
        top: 0;
        right: 5px;
      }
    }
    .shop-name {
      padding: 15px 0;
      border-bottom: 1px solid #e0e0e0;
      img {
        width: 105px;
        height: 105px;
        margin-left: 3px;
        margin-right: 14px;
        border-radius: 7px;
      }
      div {
        padding-top: 25px;
        flex: 1;
        overflow: hidden;
        p {
          color: #6d1786;
          font-size: 16px;
          line-height: 30px;
          i {
            font-style: normal;
            font-size: 10px;
            vertical-align: top;
          }
        }
        h4 {
          font-size: 14px;
          color: #404040;
          line-height: 20px;
        }
      }
    }
    .stand-box {
      padding: 15px 3px;
      border-bottom: 1px solid #e0e0e0;
      .stands {
        .stand {
          font-size: 10px;
          color: #4c4c4c;
          padding: 2px 3px;
          border-radius: 10px;
          background: #f5f5f5;
          margin-right: 10px;
          border: 1px solid #b2b2b2;
        }
      }
    }
    .buy-box {
      padding: 15px 3px;
      position: relative;
      .buy {
        position: absolute;
        top: 15px;
        right: 3px;
        .handle {
          display: block;
          width: 19px;
          height: 19px;
          text-align: center;
          line-height: 19px;
          border: 1px solid #afafaf;
          font-size: 16px;
          color: #818181;
        }
        .handle:nth-child(2) {
          min-width: 19px;
          font-size: 14px;
          color: #000;
          margin: 0 -1px;
        }
      }
    }
  }
  .address-edit {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .cancel {
      position: absolute;
      top: 310px;
      left: 15px;
      right: 15px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 42px;
      font-size: 14px;
      color: #111;
      height: 42px;
      z-index: 1;
    }
  }
}
</style>
