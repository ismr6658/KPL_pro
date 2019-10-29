<template>
  <!-- 新增 地址 -->
  <div class="address-edit-box">
    <div class="address-edit">
      <van-cell-group style="margin-bottom:15px;">
        <van-field clearable label="收货人" placeholder="" v-model="user" />
        <van-field
          clearable
          type="tel"
          label="手机号码"
          placeholder=""
          v-model="phone"
        />
        <van-field
          label="所在地区"
          placeholder=""
          right-icon="arrow"
          v-model="address"
          @focus="isShowProv = true"
        />
        <van-field
          label="详细地址"
          type="textarea"
          placeholder="如道路、门牌号、单元等"
          rows="1"
          clearable
          v-model="addrDetail"
        />
      </van-cell-group>
      <div class="switch flex just-between">
        <span>设为默认地址</span>
        <van-switch
          v-model="isDefault"
          active-color="#6d1786"
          inactive-color="#f5f5f5"
          size="21px"
        />
      </div>

      <div class="cancel " @click="cancel()">取消</div>
      <div class="save " @click="onSave()">保存</div>
    </div>
    <div class="prov-box" v-show="isShowProv">
      <div class="mask" @click="clickMask()"></div>
      <div class="prov">
        <div class="nav-box flex">
          <span class="text-of" v-html="prov"></span>
          <span class="text-of" v-html="city"></span>
          <span class="text-of" v-html="county" v-show="isCounty"></span>
          <span class="text-of" v-html="town" v-show="isTown"></span>
        </div>
        <div class="prov-main flex">
          <ul>
            <li
              class="text-of"
              :class="{ prov_bg: prov_color == item.id }"
              v-for="(item, index) in provList"
              :key="index"
              @click="getCity(item)"
            >
              {{ item.addr_name }}
            </li>
          </ul>
          <ul v-show="isCity">
            <li
              class="text-of"
              :class="{ city_bg: city_color == item.id }"
              v-for="(item, index) in cityList"
              :key="index"
              @click="getCounty(item)"
            >
              {{ item.addr_name }}
            </li>
          </ul>
          <ul v-show="isCounty">
            <li
              class="text-of"
              :class="{ county_bg: county_color == item.id }"
              v-for="(item, index) in countyList"
              :key="index"
              @click="getTown(item)"
            >
              {{ item.addr_name }}
            </li>
          </ul>
          <ul v-show="isTown">
            <li
              class="text-of"
              :class="{ town_bg: town_color == item.id }"
              v-for="(item, index) in townList"
              :key="index"
              @click="addAddress(item)"
            >
              {{ item.addr_name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editaddress",
  inject: ["reload"],
  props: {
    editAddress: Object
  },
  data() {
    return {
      isDefault: false,
      user: null,
      phone: null,
      address: "",
      addrDetail: "",
      isShowProv: false /* 是否显示地区选择 */,
      prov: "请选择" /* 省份 */,
      city: "请选择" /* 城市 */,
      county: "请选择" /* 区县 */,
      town: "请选择" /* 城镇 */,
      prov_color: "",
      city_color: "",
      county_color: "",
      town_color: "",
      isProv: false,
      isCity: false,
      isCounty: false,
      isTown: false,
      provInfo: {},
      cityInfo: {},
      countyInfo: {},
      townInfo: {},
      provList: [],
      cityList: [],
      countyList: [],
      townList: [],
      JD_addr: "",
      id: ""
    };
  },
  methods: {
    clickMask() {
      var _this = this;
      console.log(_this.townList);
      if (JSON.stringify(_this.cityInfo) == "{}") {
        _this.$toast("请选择城市");
        return;
      }
      if (JSON.stringify(_this.countyInfo) == "{}") {
        _this.$toast("请选择区县");
        return;
      }
      if (_this.townList.length > 0) {
        _this.$toast("请选择街道或镇");
        return;
      }
      _this.isShowProv = false;
    },
    cancel() {
      /* 取消保存 */
      var _this = this;
      _this.$dialog
        .confirm({
          message: "亲，点击确认将不保存该地址",
          confirmButtonColor: "#6d1786"
        })
        .then(() => {
          _this.reload();
        })
        .catch(() => {
          console.log("取消");
        });
    },
    onSave() {
      /* 保存 修改 地址 */
      var _this = this;
      var num = _this.isDefault ? 1 : 0;
      if (_this.user == null) {
        _this.$toast("亲，请输入收货人姓名");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(_this.phone)) {
        _this.$toast("亲，请输入正确收货人电话");
        return;
      }
      if (_this.address == "null") {
        _this.$toast("亲，请选择收获地址");
        return;
      }
      if (_this.addrDetail == "") {
        _this.$toast("亲，请输入详细地址");
        return;
      }
      let postData = _this.$qs.stringify({
        id: _this.id,
        user_phone: _this.phone,
        user_name: _this.user,
        province: _this.prov,
        city: _this.city,
        county: _this.county,
        town: _this.town,
        province_id: _this.provInfo.addr_id,
        city_id: _this.cityInfo.addr_id,
        county_id: _this.countyInfo.addr_id,
        town_id: _this.townInfo.addr_id,
        detail_addr:
          _this.provInfo.addr_name +
          _this.cityInfo.addr_name +
          _this.countyInfo.addr_name +
          _this.townInfo.addr_name +
          _this.addrDetail,
        if_default: num
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
    },
    getProv(o) {
      /* 获取省份 */
      var _this = this;
      var addr_id = o.addr_id == undefined ? "" : o.addr_id;
      _this.axios
        .get("/kplapi/mine/getAddrinfo?parentId=" + addr_id)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            _this.provList = body;
          } else {
           _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟！");
        });
    },
    getCity(o) {
      /* 获取城市 */
      var _this = this;
      _this.provInfo = o;
      _this.isCity = true;
      _this.isCounty = false;
      _this.isTown = false;
      _this.countyList = [];
      _this.townList = [];
      _this.prov = o.addr_name;
      _this.city = "请选择";
      _this.county = "请选择";
      _this.town = "请选择";
      _this.prov_color = o.id;
      _this.JD_addr = "";
      _this.cityInfo = {};
      _this.countyInfo = {};
      _this.axios
        .get("/kplapi/mine/getAddrinfo?parentId=" + o.addr_id)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            _this.cityList = body;
          } else {
           _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟！");
        });
    },
    getCounty(o) {
      /* 获取区县 */
      var _this = this;
      _this.cityInfo = o;
      _this.city = o.addr_name;
      _this.isCounty = true;
      _this.isTown = false;
      _this.townList = [];
      _this.countyInfo = {};
      _this.county = "请选择";
      _this.town = "请选择";
      _this.city_color = o.id;
      _this.axios
        .get("/kplapi/mine/getAddrinfo?parentId=" + o.addr_id)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            _this.countyList = body;
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟！");
        });
    },
    getTown(o) {
      /* 获取城镇 */
      var _this = this;
      _this.countyInfo = o;
      _this.county = o.addr_name;

      _this.county_color = o.id;
      _this.axios
        .get("/kplapi/mine/getAddrinfo?parentId=" + o.addr_id)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            if (body.length > 0) {
              _this.townList = body;
              _this.town = "请选择";
              _this.isTown = true;
            } else {
              _this.JD_addr =
                _this.provInfo.addr_id +
                "," +
                _this.cityInfo.addr_id +
                "," +
                _this.countyInfo.addr_id;
              _this.address =
                _this.provInfo.addr_name +
                "/" +
                _this.cityInfo.addr_name +
                "/" +
                _this.countyInfo.addr_name;

              _this.isShowProv = false;
            }
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟！");
        });
    },

    addAddress(o) {
      /* 点击城镇添加地址 */
      var _this = this;
      _this.townInfo = o;
      _this.town = o.addr_name;
      _this.town_color = o.id;
      _this.JD_addr =
        _this.provInfo.addr_id +
        "," +
        _this.cityInfo.addr_id +
        "," +
        _this.countyInfo.addr_id +
        "," +
        _this.townInfo.addr_id;
      _this.address =
        _this.provInfo.addr_name +
        "/" +
        _this.cityInfo.addr_name +
        "/" +
        _this.countyInfo.addr_name +
        "/" +
        _this.townInfo.addr_name;
      _this.isShowProv = false;
    }
  },
  created() {
    var _this = this;
    /* 获取地址列表 */
    _this.getProv("");

    if (_this.editAddress) {
      _this.user = _this.editAddress.name;
      _this.phone = _this.editAddress.tel;
      _this.prov =
        _this.editAddress.province == undefined
          ? ""
          : this.editAddress.province;
      _this.city =
        _this.editAddress.city == undefined ? "" : _this.editAddress.city;
      _this.county =
        _this.editAddress.county == undefined ? "" : _this.editAddress.county;
      _this.town =
        _this.editAddress.town == undefined ? "" : _this.editAddress.town;
      _this.provInfo["addr_name"] =
        _this.editAddress.province == undefined
          ? ""
          : this.editAddress.province;
      _this.cityInfo["addr_name"] =
        _this.editAddress.city == undefined ? "" : _this.editAddress.city;
      _this.countyInfo["addr_name"] =
        _this.editAddress.county == undefined ? "" : _this.editAddress.county;
      _this.townInfo["addr_name"] =
        _this.editAddress.town == undefined ? "" : _this.editAddress.town;
      _this.provInfo["addr_id"] =
        _this.editAddress.provinceId == undefined
          ? ""
          : _this.editAddress.provinceId;
      _this.cityInfo["addr_id"] =
        _this.editAddress.cityId == undefined ? "" : _this.editAddress.cityId;
      _this.countyInfo["addr_id"] =
        _this.editAddress.countyId == undefined
          ? ""
          : _this.editAddress.countyId;
      _this.townInfo["addr_id"] =
        _this.editAddress.townId == undefined ? "" : _this.editAddress.townId;

      console.log(_this.townInfo);
      _this.address =
        _this.provInfo.addr_name +
        "/" +
        _this.cityInfo.addr_name +
        "/" +
        _this.countyInfo.addr_name +
        "/" +
        _this.townInfo.addr_name;
      _this.JD_addr =
        _this.provInfo.addr_id +
        "," +
        _this.cityInfo.addr_id +
        "," +
        _this.countyInfo.addr_id +
        "," +
        _this.townInfo.addr_id;
      _this.isDefault = _this.editAddress.isDefault;

      _this.id = _this.editAddress.id;
    }
  }
};
</script>

<style lang="less" scoped>
.address-edit-box {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .address-edit {
    background: #f5f5f5;
    .cancel,
    .save {
      position: absolute;
      bottom: 0;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 42px;
      font-size: 14px;
      color: #111;
      height: 42px;
      width: 50%;
      z-index: 1;
    }
    .cancel {
      left: 0;
    }
    .save {
      background: #6d1786;
      color: #fff;
      right: 0;
      border: 1px solid #6d1786;
    }
    .switch {
      padding: 10px 20px;
      background: #fff;
      span {
        font-size: 13px;
        color: #2d2d2d;
        line-height: 25px;
      }
    }
  }
  .prov-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    .mask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
    .prov {
      position: absolute;
      top: 35%;
      left: 0;
      background: #fff;
      width: 100%;
      height: 65%;
      padding-left: 20px;
      padding-top: 35px;
      .nav-box {
        position: absolute;
        top: 0;
        left: 20px;
        right: 0;
        span {
          font-size: 14px;
          color: #000;
          line-height: 35px;
          width: 20%;
          display: block;
        }
      }
      .prov-main {
        height: 100%;
        ul {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          width: 20%;
          li {
            font-size: 13px;
            color: #000;
            line-height: 23px;
          }
        }
      }
    }
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
  }
}
.text-of {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.prov_bg,
.city_bg,
.county_bg,
.town_bg {
  color: #6d1786 !important;
  font-size: 14px !important;
  font-weight: 600;
}
</style>
