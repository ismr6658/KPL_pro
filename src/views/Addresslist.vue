<template>
  <!-- 地址 列表 管理 -->
  <div class="mask-box">
    <div class="content-box" v-if="!isEdit">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <van-swipe-cell :right-width="65">
            <div class="addrli flex" slot="">
              <div class="name" v-html="item.name.substr(0, 1)"></div>
              <div class="addrbox flex just-between">
                <div class="addr-center">
                  <h3>
                    <b>{{ item.name }}</b
                    ><span>{{ item.tel }}</span
                    ><i v-show="item.isDefault">默认</i>
                  </h3>
                  <p class="text-oh">
                    {{ item.addressDetail }}
                  </p>
                </div>
                <div class="addr-right">
                  <van-radio-group v-model="radio">
                    <van-radio
                      checked-color="#6d1786"
                      @click="onDefault(item, index)"
                      :name="item.id"
                    ></van-radio>
                  </van-radio-group>
                  <van-icon
                    name="arrow"
                    color="#999"
                    @click="onEdit(item, index)"
                  />
                </div>
              </div>
            </div>
            <span slot="right" class="delate" @click="onClearAddr(item)"
              >删除</span
            >
          </van-swipe-cell>
        </li>
      </ul>

      <van-goods-action>
        <van-goods-action-big-btn
          primary
          text="取消"
          @click="onCancleAddr"
          style="background:#fff !important;color:#000000;font-size:13px;"
        />
        <van-goods-action-big-btn
          primary
          text="新增地址"
          @click="isAdd = true"
          style="font-size:13px;"
        />
      </van-goods-action>
    </div>
    <!-- 地址 修改 -->
    <Editaddress v-if="isEdit" :editAddress="editAddr" />
    <!-- 新增 地址 -->
    <Addaddress v-if="isAdd" />
  </div>
</template>

<script>
import Editaddress from "@/components/Editaddress.vue";
import Addaddress from "@/components/Addaddress.vue";

export default {
  name: "addresslist",
  inject: ["reload"],
  components: {
    Editaddress,
    Addaddress
  },
  data() {
    return {
      radio: 1,
      editAddr: {} /* 要修改的地址 */,
      isEdit: false,
      isAdd: false,
      list: [] /* 地址列表 */
    };
  },
  methods: {
    onClearAddr(p) {
      /* 删除地址 */
      var _this = this;
      _this.$dialog
        .confirm({
          message: "亲，确定要删除该地址么",
          confirmButtonColor: "#6d1786"
        })
        .then(() => {
          let postData = _this.$qs.stringify({ addressId: p.id });
          _this.axios
            .post("/kplapi/mine/deleterAddress", postData)
            .then(function(res) {
              console.log(res);
              var body = res.data.body;
              if (res.data.code == 1) {
                _this.$toast.success("删除成功");
                _this.reload();
              } else {
                _this.$toast(res.data.msg);
              }
            })
            .catch(function(err) {
              _this.$toast("亲，系统正在开小差哟！");
            });
        })
        .catch(() => {
          console.log("取消删除");
        });
    },
    onDefault(p, ind) {
      /* 选择默认地址 */
      var _this = this;
      _this.radio = p.id;
      _this.list.forEach(function(item, index) {
        if (ind == index) {
          item.isDefault = true;
          console.log(item);
          item["user_name"] = item.name;
          item["user_phone"] = item.tel;
          window.localStorage.setItem("addrInfo", JSON.stringify(item));
        
          let postData = _this.$qs.stringify({
            id: item.id,
            user_phone: item.phone,
            user_name: item.user,
            province: item.province,
            city: item.city,
            county: item.county,
            town: item.town,
            province_id: item.provinceId,
            city_id: item.cityId,
            county_id: item.countyId,
            town_id: item.townId,
            detail_addr: item.addressDetail,
            if_default: 1
          });
          _this.axios
            .post("/kplapi/mine/modifyAddress", postData)
            .then(function(res) {
              var body = res.data.body;
              console.log(body);
              if (res.data.code == 1) {
                _this.$toast.success("修改成功");
                _this.reload();
              } else {
                _this.$toast(res.data.msg);
              }
            })
            .catch(function(err) {
              console.log(err);
              _this.$toast("亲，系统正在开小差哟");
            });
        } else {
          item.isDefault = false;
        }
      });
    },

    onCancleAddr() {
      var _this = this;
      _this.$router.go(-1);
    },

    onEdit(item, index) {
      /* 编辑地址 */
      this.isEdit = true;
      this.editAddr = item;
    },
    onChangeDetail() {},

    getAddrlist() {
      var _this = this;
      /* 获取地址列表 */
      _this.axios
        .get("/kplapi/mine/addressList")
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
                if (item.if_default) {
                  isdefault = true;
                  _this.radio = item.id;
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
                obj["addressDetail"] = item.detail_addr;
                obj["town"] = item.town;
                obj["provinceId"] = item.province_id;
                obj["cityId"] = item.city_id;
                obj["countyId"] = item.county_id;
                obj["townId"] = item.town_id;
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
  },
  created() {
    var _this = this;
    _this.getAddrlist();
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

.mask-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  transition: all 200ms;

  .content-box {
    position: absolute;
    width: 100%;
    background: #f5f5f5;
    top: 0;
    bottom: 50px;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    ul {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 15px;
      li {
        height: 100px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        margin-bottom: 10px;
        overflow: hidden;
        .van-swipe-cell {
          .delate {
            text-align: center;
            line-height: 100px;
            display: block;
            width: 70px;
            background: #6d1785;
            color: #fff;
          }
          .addrli {
            height: 100px;
            align-items: center;
            .name {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin: 0 10px;
              background: #ccc;
              text-align: center;
              line-height: 40px;
              color: #fff;
              font-size: 15px;
            }
            .addrbox {
              flex: 1;
              .addr-center {
                p {
                  font-size: 12px;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(102, 102, 102, 1);
                  line-height: 16px;
                }

                h3 {
                  margin-bottom: 8px;
                  span {
                    font-size: 13px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #000000;
                    margin: 0 10px;
                  }
                  b {
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #666666;
                  }
                  i {
                    font-style: normal;
                    border: 1px solid rgba(204, 204, 204, 1);
                    border-radius: 14px;
                    font-size: 10px;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    color: #000001;
                    padding: 1px 5px;
                  }
                }
              }
              .addr-right {
                padding: 0 15px;
                .van-radio {
                  margin-bottom: 15px;
                }
              }
            }
          }
        }
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
}
</style>
