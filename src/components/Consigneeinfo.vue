<template>
  <!-- 收货人信息 -->
  <div class="consignee-box">
    <div class="top-title flex just-between">
        <span style="color:#000;">收货人信息</span>
    </div>
    <ul>
        <li>
            <span>收货人：</span><span>{{orderInfo.user_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{orderInfo.user_phone}}</span>
        </li>
        <li>
            <span>收货地址：</span><span>{{orderInfo.addr_detail}}</span>
        </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "consigneeinfo",
  props:{
    orderS:Object
  },
  data() {
    return {
      orderInfo:this.orderS
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.consignee-box {
  padding: 20px 10px 15px;
  border-radius: 6px;
  background: #ffffff;
  margin-bottom: 15px;
  ul {
    li {
      margin-bottom: 5px;
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
