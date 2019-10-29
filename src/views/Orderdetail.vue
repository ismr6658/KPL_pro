<template>
  <!-- 确认订单 -->
  <div class="order-box">
    <Transportinfo :orderS="orderInfo"/>
    <Consigneeinfo :orderS="orderInfo"/>
    <Orderlist :orderS="orderInfo"/>
    <Orderinfo :orderS="orderInfo"/>
  </div>
</template>

<script>
import Orderlist from "@/components/Orderlist.vue";
import Consigneeinfo from "@/components/Consigneeinfo.vue";
import Orderinfo from "@/components/Orderinfo.vue";
import Transportinfo from "@/components/Transportinfo.vue";
export default {
  name: "confirmorder",
  data() {
    return {
      orderInfo:{}
    };
  },
  computed:{
    // orderInfo(){
    //   return this.$store.state.orderDetails
    // }
  },
  components: {
    Orderlist,
    Consigneeinfo,
    Orderinfo,
    Transportinfo
  },
  methods: {},
  created(){
    var _this = this;
    console.log(JSON.parse(window.localStorage.getItem('orderDetails')))
    _this.orderInfo = JSON.parse(window.localStorage.getItem('orderDetails'))
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order-box {
  padding: 15px 14px 50px;
 
}
</style>