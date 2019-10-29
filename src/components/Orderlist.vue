<template>
  <!-- 订单 商品 列表 -->
  <div class="order-details">
    <div class="order-ul">
      <div class="order-li">
        <div class="top-title flex just-between">
          <span>我的商品</span>
          <span>{{orderInfo.order_status | orderStatus }}</span>
        </div>
        <ul>
          <li class="flex" v-for="(item, index) in orderInfo.detaillist" :key="index">
            <img :src="item.sku_img" alt="" />
            <div class="name-box">
              <h3 class="text-oh">{{item.sku_name}}</h3>
              <!-- <h4 class="text-oh">65寸金丝镶边</h4> -->
              <h5 class="flex just-between">
                <span><i>￥</i>{{item.price}}</span><b>x{{item.sku_num}}</b>
              </h5>
            </div>
          </li>
        </ul>

        <div class="total-Box">
          <ul>
            <li class="flex just-between">
              <span>商品总价</span>
              <span>¥{{orderInfo.order_amt}}</span>
            </li>
            <li class="flex just-between">
              <span>配送费</span>
              <span>¥{{orderInfo.freight}}</span>
            </li>
          </ul>
          <ul>
            <li class="flex just-between">
              <span>实付款</span>
              <span>¥{{orderInfo.pay_amt}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderlist",
  props: {
    orderS: Object
  },
  data() {
    return {
      orderInfo: this.orderS
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
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
</style>
