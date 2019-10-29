<template>
  <!-- 确认订单 -->
  <div class="confirm-box">
    <div class="user-box">
      <p class="flex just-between">
        <span>收货人：{{ userAddr.user_name }}</span
        ><span>{{ userAddr.user_phone }}</span>
      </p>
      <p class="flex just-between">
        <span class="text-oh">收货地址：{{ userAddr.detail_addr }}</span>
        <!-- <span> <van-icon name="arrow" color="#999"/></span> -->
      </p>
    </div>
    <div class="order-details">
      <div class="order-ul">
        <div class="order-li">
          <div class="top-title flex just-between">
            <span>我的商品</span>
            <!-- <span>{{ orderInfo.order_status | orderStatus }}</span> -->
          </div>
          <ul>
            <li class="flex" v-for="(item, index) in sku" :key="index">
              <img :src="item.sku_img" alt="" />
              <div class="name-box">
                <h3 class="text-oh">{{ item.sku_name }}</h3>
                <!-- <h4 class="text-oh">65寸金丝镶边</h4> -->
                <h5 class="flex just-between">
                  <span><i>￥</i>{{ item.price }}</span
                  ><b>x{{ item.num | buynum }}</b>
                </h5>
              </div>
            </li>
          </ul>

          <div class="total-Box">
            <ul>
              <li class="flex just-between">
                <span>配送费</span>
                <span>¥&nbsp;{{ sendPrice }}</span>
              </li>
              <li class="flex just-between">
                <span>商品总价</span>
                <span>¥&nbsp;{{ shopPrice }}</span>
              </li>
            </ul>
            <!-- <ul>
              <li class="flex just-between">
                <span>实付款</span>
                <span>¥&nbsp;{{ allPrice }}</span>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box flex">
      <p>
        合计：<span>￥{{ allPrice }}</span>
      </p>
      <div class="sure" @click="payMoney()">确定</div>
    </div>
  </div>
</template>

<script>
import Mixin from "@/mixin";
export default {
  name: "confirmorder",
  mixins: [Mixin],
  data() {
    return {
      sku: [],
      userAddr: {},
      sendPrice: 0,
      shopPrice: 0,
      allPrice: 0
    };
  },
  filters: {
    buynum(val) {
      if (val == undefined) {
        return 1;
      } else {
        return val;
      }
    }
  },
  components: {},
  methods: {
    toDecimal(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return false;
      }
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf(".");
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length <= rs + 2) {
        s += "0";
      }
      return s;
    },
    payMoney() {
      /* 提交订单 */
      var _this = this;
      var s = [];
      _this.sku.forEach(function(item, index) {
        var n = {};
        n["skuid"] = item.sku_id;
        n["num"] = item.num == undefined ? 1 : item.num;
        s.push(n);
      });
      let postData = {
        addressId: _this.userAddr.id,
        skus: s,
        freight: _this.sendPrice,
        total: _this.shopPrice
      };
      _this.axios
        .post("/kplapi/main/submitOrder", postData)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
             _this.$toast("订单号：" + res.data.body);
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟");
        });
    }
  },
  created() {
    var _this = this;
    _this.sku = JSON.parse(window.localStorage.getItem("skuInfo"));
    _this.userAddr = JSON.parse(window.localStorage.getItem("addrInfo"));
    _this.sendPrice = parseFloat(
      JSON.parse(window.localStorage.getItem("freight"))
    );
    _this.sku.forEach(function(item, index) {
      var num = item.num == undefined ? 1 : item.num;
      _this.shopPrice += parseFloat(num) * parseFloat(item.price);
    });
    _this.allPrice = parseFloat(_this.sendPrice) + parseFloat(_this.shopPrice);
    _this.allPrice = _this.toDecimal(_this.allPrice);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.confirm-box {
  padding: 15px 14px 50px;
  .user-box {
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 15px 10px;
    p {
      font-size: 13px;
      color: #666;
      margin-bottom: 10px;
      span:nth-child(1) {
        flex: 1;
      }
      span:nth-child(2) {
        padding-left: 10px;
      }
    }
  }
  .order-details {
    padding: 20px 16px 25px;
    border-radius: 6px;
    background: #ffffff;
    margin-bottom: 15px;
    ul {
      li {
        margin-bottom: 11px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 6px;
          margin-right: 14px;
        }
        .name-box {
          flex: 1;
          overflow: hidden;
          padding-top: 7px;
          position: relative;
          h3 {
            font-size: 12px;
            color: #000;
            line-height: 14px;
            margin-bottom: 2px;
          }
          h4 {
            font-size: 11px;
            color: #999999;
            line-height: 13px;
          }
          h5 {
            width: 100%;
            font-family: Aleo-Regular;
            position: absolute;
            bottom: 2px;
            left: 0;
            span {
              font-size: 14px;
              color: #6d1786;
              i {
                font-size: 10px;
                font-style: normal;
                color: #6d1786;
                vertical-align: top;
              }
            }
            b {
              font-size: 11px;
              color: #666666;
              font-weight: 400;
            }
          }
        }
      }
    }
    .total-Box {
      ul:nth-child(1) {
        border-top: 1px solid #e0e0e0;
        padding: 13px 2px 2px;
        li {
          span {
            font-size: 12px;
          }
        }
      }
      ul:nth-child(2) {
        border-top: 1px solid #e0e0e0;
        padding: 20px 2px 0;
        li {
          margin-bottom: 0;
          span {
            font-size: 13px;
          }
          span:nth-child(2) {
            color: #6d1786;
          }
        }
      }
    }
  }
  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    justify-content: flex-end;
    z-index: 2;
    line-height: 50px;
    background: #fff;
    .sure {
      padding: 0 50px;
      background: #6d1786;
      color: #fff;
      font-size: 15px;
    }
    p {
      font-size: 13px;
      color: #000;
      padding-right: 10px;
      span {
        color: #6d1786;
      }
    }
  }
}
</style>