<template>
  <div class="g-shopList">
    <ul class="flex">
      <li
        v-for="(item, index) in guessList"
        :key="index"
        @click="goProDetails(item)"
      >
        <img :src="item.sku_img" alt="" />
        <h4 class="text-oh">{{ item.sku_name }}</h4>
        <h5>
          <i>￥</i><b>{{ item.price }}</b
          ><span>￥{{ item.marking_price }}</span>
        </h5>
      </li>

      <li class="last">人家也是有底线的哦</li>
    </ul>
    <van-loading type="spinner" v-show="isLoading" size="60px" />
  </div>
</template>

<script>
import Mixin from "@/mixin";
export default {
  name: "Guess",
  mixins: [Mixin],
  data() {
    return {
      guessList: [],
      guessPager: 0,
      finishedList: [],
      isLoading: false
    };
  },
  methods: {
    onLoading() {
      var _this = this;
      _this.guessPager++;
      _this.isLoading = true;
      /* 猜你喜欢 上拉加载 start */
      _this.axios
        .get("/kplapi/main/like?pageNumber=" + _this.guessPager)
        .then(function(res) {
          // console.log(res);
          var body = res.data.body;
          _this.finishedList = body;
          if (res.data.code == 1) {
            // console.log(body);

            if (body.length <= 0) {
              console.log("end");
              _this.isLoading = false;
              // _this.$toast("亲，人家也是有底线的哦！！！");
            } else {
              _this.isLoading = false;
              _this.guessList = _this.guessList.concat(body);
            }
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("连接错误哦！！！");
        });
    },
    handleScroll: function() {
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
      // console.log(scrollTop);
      // console.log(clientHeight);
      // console.log(scrollHeight);
      if (clientHeight + scrollTop == scrollHeight) {
        _this.isLoading = true;
        if (_this.finishedList.length > 0) {
          _this.onLoading();
          console.log(_this.finishedList);
          return 
        }
        if (_this.finishedList.length == 0) {
          _this.isLoading = false;
        }
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  mounted() {
    var _this = this;
    _this.onLoading();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.g-shopList {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 10px;
  ul {
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 48%;
      img {
        width: 100%;
        // height: 198px;
        margin-bottom: 12px;
      }
      h4 {
        font-size: 13px;
        color: #404040;
        padding: 0 10px;
        margin-bottom: 4px;
      }
      h5 {
        font-size: 13px;
        padding-left: 15px;
        margin-bottom: 10px;
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
</style>

