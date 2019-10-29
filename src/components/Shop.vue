<template>
  <!-- 商品 -->
  <div
    class="shop-box minirefresh-wrap"
    id="minirefresh"
    style="top:85px;padding-bottom:50px;"
  >
    <div class="g-shopList minirefresh-scroll">
      <ul class="flex">
        <li v-for="(item, index) in prolists" :key="index" @click="goProDetails(item)">
          <img :src="item.sku_img" alt="" />
          <div class="shop-details">
            <h4 class="text-oh">{{item.sku_name}}</h4>
            <!-- <p>
              <span>5G内存</span>
            </p> -->
            <h5><i>￥</i><b>{{item.price}}</b><span>￥{{item.marking_price}}</span></h5>
          </div>
        </li>
        <li class="last">人家也是有底线的哦</li>
      </ul>
    </div>
  </div>
</template>

<script>
import MiniRefreshTools from "minirefresh";
import "minirefresh/dist/debug/minirefresh.css";
import Mixin from "@/mixin";
export default {
  name: "Shop",
  mixins: [Mixin],
  props:{
    prolists:Array
  },
  methods: {},
  mounted() {
    var _this = this;
    // _this.minirefresh = new MiniRefresh({
    //   container: "#minirefresh",
    //   down: {
    //     callback: function() {

    //       _this.minirefresh.endDownLoading();
    //     }
    //   },
    //   up: {
    //     callback: function() {
    //       console.log(1)
    //       _this.minirefresh.endUpLoading(true);
    //     }
    //   }
    // });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.shop-box {
  padding: 0 10px;

  .g-shopList {
    width: 100%;
    background: #f5f5f5;
    overflow-x: hidden;
    overflow-y: auto;
    ul {
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 48%;
        margin-bottom: 12px;
        overflow-x: hidden;
        img {
          width: 100%;
          // height: 164px;
          display: block;
        }
        .shop-details {
          width: 100%;
          padding: 9px 8px 15px;
          background: #fff;
          h4 {
            font-size: 13px;
            color: #404040;
            margin-bottom: 6px;
          }
          p {
            margin-bottom: 6px;
            span {
              font-size: 10px;
              color: #4c4c4c;
              background: #b2b2b2;
              padding: 2px 1px;
              border-radius: 10px;
              margin-right: 3px;
            }
          }
          h5 {
            font-size: 13px;
            i,
            b {
              font-style: normal;
              font-size: 13px;
              color: #6d1786;
            }
            i {
              transform: scale(0.5);
            }
            span {
              margin-left: 10px;
              font-size: 11px;
              color: #b2b2b2;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
</style>

