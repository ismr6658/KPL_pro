<template>
  <!-- 我的 -->
  <div id="mine">
    <div class="user-box flex" v-if="isLogin">
      <img :src="user.wx_headimg" alt="" class="header" />
      <p>{{ user.wx_nick }}</p>
    </div>
    <div class="user-box flex" v-if="!isLogin">
      <img src="@/assets/timg.jpg" alt="" class="header" />
      <p @click="onlogin()">登录/注册</p>
    </div>
    <ul class="nav-box flex">
      <li
        v-for="(item, index) in navList"
        :key="index"
        @click="getOrderdetail(index)"
      >
        <span>{{ item }}</span>
      </li>
      <!-- <li>
        <span>待收货</span>
      </li>
      <li>
        <span>待付款</span>
      </li>
      <li>
        <span>已完成</span>
      </li> -->
    </ul>
    <ul class="col-address">
      <li @click="goGollect()">
        <van-icon name="like-o" style=" vertical-align: middle" />&nbsp;
        <span>我的收藏</span>
      </li>
      <li @click="goAddrlist()">
        <van-icon name="location-o" style=" vertical-align: middle" />&nbsp;
        <span>地址管理</span>
      </li>
    </ul>
    <div class="guess">
      <h3>猜你喜欢</h3>
      <Guess />
    </div>
  </div>
</template>
<script>
import Guess from "@/components/Guess.vue";
import { unwatchFile } from "fs";
export default {
  components: {
    Guess
  },
  data() {
    return {
      navList: ["全部订单", "待付款", "待收货", "已完成"],
      user: {},
      isLogin: false
    };
  },
  methods: {
    onlogin() {
      var _this = this;
      _this.$router.push("/login");
    },
    getOrderdetail(ind) {
      /* 点击获取订单详情 */
      var _this = this;
      _this.$router.push({
        path: "/mine/order",
        query: {
          orderStatus: ind
        }
      });
    },
    goMepage(o) {
      /* 个人信息 */
      if (o == "INFO") {
        this.$router.push("/mine/info");
      }
    },
    goGollect() {
      /* 我的收藏 */
      this.$router.push("/mine/collect");
    },
    goAddrlist() {
      /* 地址管理 */
      this.$router.push("/mine/addresslist");
    }
  },
  created() {
    var _this = this;
    _this.axios
      .get("/kplapi/mine/userInfo")
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        var defaultAddr = {};
        defaultAddr = res.data.defaultAddr;
        console.log(defaultAddr);
        if (res.data.code == 1) {
          _this.isLogin = true;
          _this.user = body;
          if (defaultAddr == undefined) {
            _this.$router.push("/mine/addresslist");
            return;
          }
          defaultAddr["name"] = defaultAddr.user_name;
          defaultAddr["tel"] = defaultAddr.user_phone;
          window.localStorage.setItem("addrInfo", JSON.stringify(defaultAddr));
        } else {
          _this.$toast(res.data.msg);
            // _this.$router.push("/login");
        }
      })
      .catch(function(err) {
        _this.$toast("亲，系统正在开小差哟！2242");
      });
  }
};
</script>
<style lang="less" scoped>
#mine {
  padding-bottom: 50px;
  .user-box {
    width: 100%;
    height: 108px;
    padding-left: 30px;
    background: url("../assets/banner.png") no-repeat;
    background-size: 100% 100%;
    align-items: center;
    margin-bottom: 8px;

    .header {
      width: 49px;
      height: 49px;
      border-radius: 50%;
      margin-right: 12px;
    }
    p {
      font-size: 13px;
      color: #fff;
    }
  }
  .nav-box {
    width: 100%;
    height: 71px;
    background: #fff;
    align-items: center;
    margin-bottom: 7px;
    li {
      flex: 1;
      align-items: center;
      font-size: 12px;
      color: #404040;
      flex-direction: column;
      text-align: center;
      padding-top: 44px;
      height: 100%;
    }
    li:nth-child(1) {
      background: url("../assets/bag.png") no-repeat center 16px;
      background-size: 24px;
    }
    li:nth-child(2) {
      background: url("../assets/car.png") no-repeat center 13px;
      background-size: 25px;
    }
    li:nth-child(3) {
      background: url("../assets/card.png") no-repeat center 14px;
      background-size: 25px;
    }
    li:nth-child(4) {
      background: url("../assets/out.png") no-repeat center 13px;
      background-size: 25px;
    }
  }
  .col-address {
    background: #fff;
    padding: 0 15px;
    margin-bottom: 10px;
    li {
      width: 100%;
      border-bottom: 1px solid #e0e0e0;
      padding: 16px 0;
      font-size: 13px;
      color: #404040;
      padding-left: 5px;
    }
    li:last-child {
      border-bottom: none;
    }
  }
  .guess {
    position: relative;
    h3 {
      font-size: 14px;
      font-weight: 400;
      color: #111;
      line-height: 15px;
      padding-left: 26px;
      margin-bottom: 10px;
      position: relative;
    }
    h3:after {
      content: "";
      width: 2px;
      height: 12px;
      background: #6d1786;
      position: absolute;
      top: 1px;
      left: 20px;
    }
  }
}
</style>


