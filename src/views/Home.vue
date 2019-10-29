<template>
  <!-- 首页 -->
  <div class="home" id="scrollBox">
    <Search v-if="!isVirtual" :searchinfo="search" />
    <div class="banner oh">
      <Banner v-if="!isVirtual" :images="bannerList" />
      <div class="v-banner" v-if="isVirtual"></div>
    </div>
    <div class="day flex">
      <h3 class="flex just-between"><span>每日推荐</span> <span>更多</span></h3>
      <Everyday v-if="!isVirtual" :everyDays="everydayList" />
      <div class="v-everyday" v-if="isVirtual">
        <div class="v-daybox flex">
          <div
            class="v-dayli flex just-center"
            v-for="(item, index) in 5"
            :key="index"
          >
            <span class="dblock"></span>
            <span class="dblock"></span>
            <span class="dblock"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="select flex">
      <div class="s-left">
        <!-- <h4>过滤空气净化</h4>
        <h5>过滤空气化器</h5> -->
        <img :src="act_img_l" class="s-imgL" alt="" />
      </div>
      <div class="s-right">
        <div class="sr-top">
          <!-- <h4>过滤空气净化</h4>
          <h5>过滤空气净化器</h5> -->
          <img :src="act_img_rt" class="s-imgL" alt="" />
        </div>
        <div class="sr-bottom">
          <!-- <h4>过滤空气净化</h4>
          <h5>过滤空气化器</h5> -->
          <img :src="act_img_tb" class="s-imgL" alt="" />
        </div>
      </div>
    </div>
    <div class="guess">
      <h3>猜你喜欢</h3>
      <Guess  v-if="!isVirtual"/>

      <div class="v-guess" v-if="isVirtual">
        <div class="v-guessbox flex just-between">
          <div
            class="v-guessli flex just-center"
            v-for="(item, index) in 5"
            :key="index"
          >
            <span class="dblock"></span>
            <span class="dblock"></span>
            <span class="dblock"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Banner from "@/components/Banner.vue";
import Everyday from "@/components/Everyday.vue";
import Mixin from "@/mixin";
import Search from "@/components/Search.vue";
import Guess from "@/components/Guess.vue";

export default {
  name: "home",
  mixins: [Mixin],
  data() {
    return {
      search: "搜索",
      isVirtual: true /* 骨架屏 */,
      bannerList: [],
      everydayList: [],
      actList: [],
      act_img_l: "",
      act_img_rt: "",
      act_img_tb: ""
    };
  },
  components: {
    Banner,
    Everyday,
    Search,
    Guess
  },

  methods: {
   
  },
  created() {
    var _this = this;
  },
  mounted() {
    /* 生命周期 */

    var _this = this;
    /* 轮播 每日推荐 活动版块 等 start */
    _this.axios
      .get("/kplapi/main/index")
      .then(function(res) {
        var body = res.data.body;
        console.log(body);
        if (res.status == 200 && res.data.code == 1) {
          _this.bannerList = body.platformBanners;
          _this.everydayList = body.list;
          _this.actList = body.activeTheme;
          _this.act_img_l = body.activeTheme[0].active_img;
          _this.act_img_rt = body.activeTheme[1].active_img;
          _this.act_img_tb = body.activeTheme[2].active_img;
          _this.isVirtual = false;
        } else {
          _this.$toast(res.data.msg);
        }
      })
      .catch(function(err) {
        console.log(err);
        _this.$toast("连接错误哦！！！");
      });
  }
  // destroyed() {
  //   this.guessPager = 1;
  //   window.removeEventListener("scroll", this.handleScroll);
  // }
};
</script>
<style lang="less" scoped>
@v_bgColor: #fff;
@10px: 10px;
@14px: 14px;
@15px: 15px;
@20px: 20px;
@5px: 5px;
@one: 100%;
@hide: hidden;
h3 {
  font-size: @14px;
  font-weight: 400;
  color: #111;
  line-height: @15px;
  padding: 0 @20px;
  margin-bottom: @15px;
  position: relative;
}
h3:after {
  content: "";
  width: 2px;
  height: 14px;
  background: #6d1786;
  position: absolute;
  top: 0;
  left: @15px;
}
.home {
  width: @one;
  background: #ededed;
  padding-bottom: 50px;
  /*banner start*/
  .banner {
    height: 162px;
    margin-bottom: @10px;
    .v-banner {
      width: @one;
      height: @one;
      background: #f5f5f5;
    }
  }
  /*banner end*/
  /*day start*/
  .day {
    height: 174px;
    padding-top: 12px;
    flex-direction: column;
    margin-bottom: 8px;
    background: #fff;
    h3 {
      span:nth-child(2) {
        font-size: 13px;
        color: #b2b2b2;
      }
    }
    .v-everyday {
      width: @one;
      height: @one;
      margin-bottom: @10px;
      padding: @10px @15px;
      overflow: @hide;

      .v-daybox {
        height: @one;
        overflow-x: auto;
        .v-dayli {
          flex-shrink: 0;
          width: 30%;
          flex-direction: column;
          align-items: center;
          span:nth-child(1) {
            width: 70px;
            height: 70px;
            background: #f5f5f5;
            margin-bottom: @10px;
          }
          span:nth-child(2) {
            width: 70px;
            height: 10px;
            background: #f5f5f5;
            margin-bottom: @10px;
          }
          span:nth-child(3) {
            width: 90px;
            height: 10px;
            background: #f5f5f5;
          }
        }
      }
    }
  }
  /*day end*/
  /*活动版块 start*/
  .select {
    height: 200px;
    width: @one;

    h4 {
      font-size: 15px;
      color: #404040;
      margin-bottom: 5px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    h5 {
      font-size: 13px;
      color: #8d8d8d;
      margin-bottom: 5px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .s-left {
      width: 50%;
      padding: 20px 15px;
      overflow: hidden;
      position: relative;
      background: #bedecd;
      height: 100%;
      .s-imgL {
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .s-right {
      width: 50%;
      height: 100%;
      .sr-top,
      .sr-bottom {
        height: 50%;
        padding: 20px 8px;
        position: relative;
        h4 {
          width: 50%;
        }
        img {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .sr-top {
        background: #c6eaf9;
      }
      .sr-bottom {
        background: #dfe1e5;
      }
    }
  }
  /*guess start*/
  .guess {
    padding-top: 12px;
    .v-guess {
      width: @one;
      .v-guessbox {
        flex-wrap: wrap;
        .v-guessli {
          width: 48%;
          height: 200px;
          flex-direction: column;
          margin: @10px 0;
          padding: 0 @10px;
          span:nth-child(1) {
            width: @one;
            height: @one;
            background: @v_bgColor;
            margin: 0 auto @10px;
          }
          span:nth-child(2) {
            width: 70px;
            height: 10px;
            background: @v_bgColor;
            margin-bottom: @10px;
          }
          span:nth-child(3) {
            width: 90px;
            height: 10px;
            background: @v_bgColor;
          }
        }
      }
    }
    .g-shopList {
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;

      .g-ul {
        flex-wrap: wrap;
        justify-content: space-between;
        .g-li {
          width: 48%;
          img {
            width: 100%;
            height: 198px;
            margin-bottom: 12px;
          }
          h4 {
            font-size: 13px;
            color: #404040;
            padding: 0 10px;
            margin-bottom: 8px;
          }
          h5 {
            font-size: 13px;
            padding: 0 10px;
            margin-bottom: 10px;
            i,
            b {
              font-style: normal;
              font-size: 13px;
              color: #6d1786;
            }
            i {
              font-size: 8px;
              vertical-align: top;
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
  /*guess end*/
}
</style>


