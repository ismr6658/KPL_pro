<template>
  <!-- 订单 信息 -->
  <div class="orderInfo-box">
    <div class="top-title flex just-between">
      <span>订单信息</span>
    </div>
    <ul>
      <li><span>订单编号：</span><span>{{orderInfo.order_no}}</span></li>
      <li><span>创建时间：</span><span>{{orderInfo.create_time}}</span></li>
      <li><span>成交时间：</span><span>{{orderInfo.pay_time}}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "orderinfo",
  props: {
    orderS: Object
  },
  data() {
    return {
      orderInfo: this.orderS
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.orderInfo-box {
  padding: 20px 10px 15px;
  border-radius: 6px;
  background: #ffffff;
  margin-bottom: 15px;
  ul {
    li {
      margin-bottom: 10px;
      span {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #666;
      }
    }
  }
}
</style>
