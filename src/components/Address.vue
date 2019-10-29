<template>
  <!-- 配送 地址 -->
  <div class="mask-box">
    <div class="mask" @click="close"></div>
    <transition name="van-slide-up">
      <div class="content-box" v-if="!isEdit">
        <div class="title">
          <p>配送地址</p>
          <van-icon name="plus" class="close" @click="isEdit = !isEdit; editAddr = {};" />
        </div>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          @edit="onEdit"
          @select="onSelect"
        />

        <van-goods-action>
          <van-goods-action-big-btn primary text="取消" @click="close" />
        </van-goods-action>
      </div>
    </transition>
    <!-- 地址 修改 -->
    <div class="address-edit" v-if="isEdit">
      <van-address-edit
        delete-button-text="取消"
        :area-list="areaList"
        show-set-default
        :address-info="editAddr"
        show-delete
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        style="height:100%;overflow-y:auto"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "address",
  data() {
    return {
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
           140000: "上海市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
        }
      },
      editAddr: {} /* 要修改的地址 */,
      isEdit: false,
      chosenAddressId: "1",
      list: []
      // {
      //   id: "1",
      //   name: "张三",
      //   tel: "13000000000",
      //   province: "山东省",
      //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
      // },
      // {
      //   id: "2",
      //   name: "李四",
      //   tel: "1310000000",
      //   address: "浙江省杭州市拱墅区莫干山路 50 号"
      // }
    };
  },
  methods: {
    onSelect(item, index) {
      /* 选择地址 */
      this.$emit("hideaddress", item);
    },
    close() {
      this.$emit("hideaddress");
    },
    onDelete() {
      /* 删除地址 */
      alert(1231);
      this.isEdit = false;
    },
    onEdit(item, index) {
      // 编辑地址
      console.log(item);
      this.isEdit = true;
      this.editAddr = item;
    },
    onChangeDetail() {},
    onSave(content) {
      //保存新增地址
      console.log(content);
      var _this = this;
      var addr = {};
      var num = content.isDefault ? 1 : 0;
      // addr["name"] = content.name;
      // addr["tel"] = content.tel;
      // addr["address"] = content.province + content.county + content.city;
      // _this.list.push(addr);
      let postData = _this.$qs.stringify( {
          userId: 1,
          phone: content.tel,
          name: content.name,
          address:
            content.province +
            content.county +
            content.city +
            content.addressDetail,
          isDefault: num
        });
      _this.axios
        .post("/kplapi/mine/addAddress",postData)
        .then(function(res) {
          var body = res.data.body;
          console.log(body);
          if (res.status == 200 && res.data.code == 1) {
            _this.bannerList = body.platformBanners;
            _this.everydayList = body.list;
            _this.actList = body.activeTheme;
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.$toast("亲，系统正在开小差哟");
        });
    }
  },
  created() {
    var _this = this;
    /* 获取地址列表 */
    _this.axios
      .get("/kplapi/mine/addressList?userId=1")
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        if (res.data.code == 1) {
          if (body.length <= 0) {
            _this.$toast("亲，您需要添加配送地址哦");
          } else {
            body.forEach(function(item, index) {
              var obj = {};
              var isdefault = item.if_default == 1 ? true : false;
              obj["id"] = item.id;
              obj["name"] = item.user_name;
              obj["tel"] = item.user_phone;
              obj["address"] = item.detail_addr;
              obj["province"] = item.province;
              obj["city"] = item.city;
              obj["county"] = item.county;
              obj["isDefault"] = isdefault;
              obj["addressDetail"] = item.detail_addr;
              _this.list.push(obj);
            });
          }
        } else {
          _this.$toast(res.data.msg);
        }
      })
      .catch(function(err) {
        _this.$toast("亲，系统开小差了哟！");
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
  }
}
</style>
