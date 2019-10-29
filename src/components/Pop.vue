<template>
  <!-- 商品规格 -->
  <div class="mask-box">
    <div class="mask" @click="close"></div>
    <div class="content-box">
      <div class="title">
        <p>选择规格</p>
        <van-icon name="cross" class="close" @click="close" />
      </div>
      <div class="shop-name flex">
        <img src="@/assets/timg.jpg" alt="" />
        <div>
          <p><i>￥</i>1399</p>
          <h4 class="text-oh">小米全面屏电视</h4>
        </div>
      </div>
      <div class="stand-box">
        <h4 class="tip-name">产品规格</h4>
        <div class="stands">
          <span class="stand">4K-HDR</span>
          <span class="stand checked-stand ">4K-HDR</span>
        </div>
      </div>
      <div class="buy-box">
        <h4 class="tip-name">购买数量</h4>
        <div class="buy flex">
          <span class="handle">-</span>
          <span class="handle">1</span>
          <span class="handle">+</span>
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-big-btn text="加入购物车" />
        <van-goods-action-big-btn primary text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pop",
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("hidepop");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.van-button--danger {
  background: #6d1786;
  border: 0;
}
.van-button--warning {
  background-color: #fcb632;
  border: 0;
}
.tip-name {
  font-size: 14px;
  color: #404040;
  font-family: MicrosoftYaHei;
  margin-bottom: 15px;
}
.checked-stand {
  color: #6d1786 !important;
  border: 1px solid #6d1786 !important;
  background: #fff !important;
}
.mask-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  transition: all 200ms;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .content-box {
    position: absolute;
    width: 100%;
    max-height: 60%;
    background: #fff;
    border-radius: 9px 9px 0 0;
    bottom: 0;
    left: 0;
    padding: 19px 15px 50px;
    overflow-y: auto;
    overflow-x: hidden;
    .title {
      position: relative;
      margin-bottom: 15px;
      p {
        font-size: 15px;
        color: #404040;
        text-align: center;
      }
      .close {
        position: absolute;
        top: 0;
        right: 5px;
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
