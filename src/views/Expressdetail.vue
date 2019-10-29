<template>
  <!-- 物流 信息 -->
  <div class="express-box">
    <div class="express-name">
      <p>运单号：VX1656544212</p>
      <p>国内承运人：京东快递</p>
      <p>预计送达：5月11日</p>
    </div>
    <div class="express-line">
      <ul>
        <li v-for="(item, index) in 10" :key="index">
          <h3>已签收</h3>
          <h4>您的订单正在配送途中</h4>
          <h5>2019-04-03 15:02:23</h5>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "expressdetail",
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.express-box {
  padding: 15px 14px 50px;
  .express-name {
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 15px 15px 10px;
    p {
      font-size: 12px;
      color: #000000;
      margin-bottom: 10px;
    }
  }
  .express-line {
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 15px 15px 10px;
    font-size: 12px !important;
    ul {
      li {
        color: #8d8d8d;
        padding-bottom: 20px;
        position: relative;
        h3 {
          font-size: 14px;
          margin-bottom: 15px;
          position: relative;
          margin-left: 20px;
        }
        h3::after {
          content: "";
          display: block;
          width: 13px;
          height: 13px;
          background: #b8b8b8;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: -20px;
          transform: translateY(-50%);
        }
        h4 {
          font-size: 12px;
          margin-bottom: 10px;
          position: relative;
          margin-left: 20px;
        }
        h4::after {
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          background: #b8b8b8;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: -1.04rem;
          transform: translateY(-50%);
        }
        h5 {
          font-size: 11px;
          margin-left: 20px;
        }
      }
      li::after {
        content: "";
        display: block;
        width: 1px;
        height: 100%;
        background: #b8b8b8;
        position: absolute;
        top: 0;
        left: 6px;
        // transform: translateY(-50%)
      }
    }
  }
}
</style>