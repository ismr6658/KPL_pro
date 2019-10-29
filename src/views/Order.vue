<template>
  <!-- 我的订单 -->
  <div class="order-box">
    <div class="order-nav-box">
      <ul class="flex">
        <li
          v-for="(nav, index) in navBox"
          :key="index"
          @click="getOrderInfo(index)"
        >
          <span :class="{ clickNav: isClick == index }">{{ nav }}</span>
        </li>
      </ul>
    </div>
    <div class="order-null" v-show="!isHaveOrder">暂无该订单列表</div>
    <!-- 订单信息 start -->
    <div
      class="order-details"
      v-show="isHaveOrder"
      v-for="(item, index) in orderList"
      :key="index"
    >
      <div class="order-ul">
        <div class="order-li">
          <div class="top-title flex just-between">
            <span>我的商品</span>
            <span :class="{ color9: isfontColor == item.order_status }">{{
              item.order_status | orderStatus
            }}</span>
          </div>
          <ul>
            <!-- 订单商品 start -->
            <li
              class="flex"
              v-for="(pro, index) in item.detaillist"
              :key="index"
              @click="openOrder(item)"
            >
              <img :src="pro.sku_img" alt="" />
              <div class="name-box">
                <h3 class="text-oh">{{ pro.sku_name }}</h3>
                <!-- <h4 class="text-oh">65寸金丝镶边</h4> -->
                <h5 class="flex just-between">
                  <span><i>￥</i>{{ pro.price }}</span
                  ><b>x{{ pro.sku_num }}</b>
                </h5>
              </div>
            </li>
            <!-- 订单商品 end -->
          </ul>
          <div class="total-Box flex just-between">
            <p>
              合计：<span>￥{{ item.order_amt }}</span>
            </p>
            <div class="btn-box" v-show="statusWaitPay == item.order_status">
              <button class="btn" @click="cancelOrder(item)">取消订单</button>
              <button class="btn" @click="payMoney(item)">付款</button>
            </div>
            <div class="btn-box" v-show="statusWaitPut == item.order_status">
              <button class="btn">查看物流</button>
              <button class="btn" @click="surePro(item)">确认收货</button>
            </div>
            <div class="btn-box" v-show="statusEnd == item.order_status">
              <button class="btn" @click="delateOrder(item)">删除订单</button>
              <button class="btn">再次购买</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单信息 end -->
    <van-loading type="spinner" v-show="isLoading" size="60px" />
  </div>
</template>

<script>
import OrderInfo from "@/components/Orderlist.vue";
export default {
  components: {
    OrderInfo
  },
  inject: ["reload"],
  name: "order",
  data() {
    return {
      isfontColor: 2,
      isHaveOrder: true,
      navBox: ["全部", "待付款", "待收货", "已完成"],
      isClick: 0,
      orderList: [],
      statusWaitPay: 0 /* 待付款订单 */,
      statusWaitPut: 1 /* 待收货订单 */,
      statusEnd: 2 /* 已完成订单 */,
      statusAfter: 3 /* 售后订单 */,
      finishedList: [],
      isLoading: false,
      pager: 0,
      orderStatus: null
    };
  },
  filters: {
    orderStatus(val) {
      if (val == 0) {
        return "待付款";
      }
      if (val == 1) {
        return "待收货";
      }
      if (val == 2) {
        return "已完成";
      }
      if (val == 3) {
        return "售后";
      }
    }
  },
  methods: {
    surePro(o) {
      /* 确认收货 */
      var _this = this;
      console.log(o);
      let postData = _this.$qs.stringify({
        orderNo: o.order_no
      });
      _this.axios
        .post("/kplapi/mine/confirmOrder", postData)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
          } else {
           _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟！");
        });
    },
    payMoney(o) {
      /* 付款 */
      var _this = this;
      console.log(o);
      let postData = _this.$qs.stringify({
        orderNo: o.order_no
      });
      _this.axios
        .post("/kplapi/mine/repayOrder", postData)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
          } else {
           _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟！");
        });
    },
    openOrder(o) {
      /* 查看订单详情 */
      var _this = this;
      _this.$store.commit("getOrder", o);
      _this.$router.push("/mine/order/orderdetail");
      window.localStorage.setItem("orderDetails", JSON.stringify(o));
    },
    delateOrder(o) {
      /* 删除订单 */
      var _this = this;
      _this.$dialog
        .confirm({
          message: "亲，确定要删除订单么",
          confirmButtonColor: "#6d1786"
        })
        .then(() => {
          let postData = _this.$qs.stringify({
            orderNo: o.order_no
          });
          _this.axios
            .post("/kplapi/mine/deleterOrder", postData)
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
    cancelOrder(o) {
      /* 取消订单 */
      var _this = this;
      _this.$dialog
        .confirm({
          message: "亲，确定要取消订单么",
          confirmButtonColor: "#6d1786"
        })
        .then(() => {
          let postData = _this.$qs.stringify({
            orderNo: o.order_no
          });
          _this.axios
            .post("/kplapi/mine/cancelOrder", postData)
            .then(function(res) {
              console.log(res);
              var body = res.data.body;
              if (res.data.code == 1) {
                _this.$toast.success("取消成功");
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
    onloading(ind) {
      var _this = this;
      ind = ind - 1;
      ind = ind == -1 ? "" : ind;
      _this.pager++;
      _this.axios
        .get(
          "/kplapi/mine/getOrderList?status=" + ind + "&pageNum=" + _this.pager
        )
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          _this.finishedList = body;
          if (res.data.code == 1) {
            if (body.length > 0) {
              _this.isHaveOrder = true;
              _this.orderList = _this.orderList.concat(body);
              _this.isLoading = false;
            } else {
              console.log(1);
              // _this.isHaveOrder = false;
              _this.isLoading = false;
              _this.$toast("亲，没有更多数据了哦！！！");
            }
          } else {
            _this.$toast(res.data.msg);
            _this.isLoading = false;
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟！");
        });
    },
    getOrderInfo(ind) {
      /* 点击获取订单列表 */
      var _this = this;
      _this.isClick = ind;
      _this.orderStatus = ind;
      _this.isLoading = true;
      _this.pager = 0;
      _this.orderList = [];
      _this.onloading(_this.orderStatus);
    },
    handleScroll() {
      var _this = this;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 设备/屏幕高度
      let scrollObj = document.body; // 滚动区域
      let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
      //滚动条到底部的条件
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (clientHeight + scrollTop == scrollHeight) {
        _this.guessPager++;
        if (_this.finishedList.length > 0) {
          _this.onloading(_this.orderStatus);
          _this.isLoading = true;
        }
      }
    }
  },
  created() {
    var _this = this;
    window.addEventListener("scroll", this.handleScroll, true);
  },
  mounted() {
    var _this = this;
    _this.isClick = _this.$route.query.orderStatus;
    _this.orderStatus = _this.$route.query.orderStatus;
    _this.onloading(_this.$route.query.orderStatus);
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order-box {
  padding: 15px 15px 50px;
  width: 100%;
  .order-nav-box {
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    margin-bottom: 13px;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.6);
      display: none;
    }
    &:hover::-webkit-scrollbar-thumb {
      display: block;
    }
    ul {
      li {
        width: 25%;
        text-align: center;
        flex-shrink: 0;
        span {
          color: #999999;
          font-size: 13px;
          font-family: PingFangSC-Medium;
        }
        .clickNav {
          color: #000000;
          font-weight: 500;
          padding-bottom: 5px;
          position: relative;
          display: inline-block;
        }
        .clickNav::after {
          content: "";
          display: block;
          width: 110%;
          height: 2px;
          background: #6d1786;
          position: absolute;
          bottom: 0;
          left: -5%;
        }
      }
    }
  }
  .order-details {
    padding: 20px 16px 25px;
    border-radius: 6px;
    background: #ffffff;
    margin-bottom: 15px;
    .top-title {
      span:last-child {
        color: #6d1786;
      }
    }
    ul {
      margin-bottom: 23px;
      li {
        margin-bottom: 11px;
        img {
          width: 94px;
          height: 94px;
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
            margin-bottom: 6px;
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
            bottom: 3px;
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
      p {
        font-size: 15px;
        color: #000000;
        padding-top: 3px;
        span {
          color: #6d1786;
        }
      }
      .btn-box {
        button {
          outline: none;
          padding: 4px 11px;
          background: transparent;
          border: 0;
          font-size: 12px;
          margin: 0 6px;
        }
        button:nth-child(1) {
          border: 1px solid #cccccc;
          border-radius: 24px;
          color: #666666;
          background: #fff;
        }
        button:nth-child(2) {
          border: 1px solid #6d1786;
          border-radius: 24px;
          color: #fff;
          background: #6d1786;
        }
      }
    }
  }
}
.order-null {
  font-size: 14px;
  text-align: center;
  line-height: 100px;
  color: #8d8d8d;
}
.color9 {
  color: #999 !important;
}
</style>
