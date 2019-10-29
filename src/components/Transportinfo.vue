<template>
  <!-- 物流信息 -->
  <div class="transport-box">
    <div class="top-title flex just-between">
        <span>物流信息</span>
        <span>已下单</span>
    </div>
   <div class="transport-info">
       <p class="text-oh">您提交了订单，请等待第三方卖家系统确认</p>
       <p>2019-04-03 15:02:23</p>
        <van-icon name="arrow" class="arrow"/>
   </div>
  </div>
</template>

<script>
export default {
  name: "transportinfo",
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.transport-box {
  padding: 20px 10px 15px;
  border-radius: 6px;
  background: #ffffff;
  margin-bottom: 15px;
  .top-title {
    span:nth-child(2) {
      color: #6d1786 !important;
    }
  }
  .transport-info {
    padding-right: 30px;
    position: relative;
    p {
      font-size: 11px;
      color: #666666;
      line-height: 14px;
      margin-bottom: 5px;
    }
    .arrow {
      position: absolute;
      top: 8px;
      right: 10px;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>
