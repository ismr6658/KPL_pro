<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />

    <van-tabbar v-model="active" active-color="#6D1786">
      <van-tabbar-item icon="home-o" to="/">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="qr-invalid" to="/classify">
        分类
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">
        购物车
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/mine">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  mounted() {
    var l = window.location.hash.split("/")[1];
    console.log(l);
    if (l == "") {
      console.log("首页");
      this.active = 0;
    } else if (l == "classify") {
      console.log("分类");
      this.active = 1;
    } else if (l == "cart") {
      console.log("购物车");
      this.active = 2;
    } else if (l == "mine") {
      console.log("我的");
      this.active = 3;
    }
  },
  watch: {
    // this.$route.path
    "$route.path": function(newVal, oldVal) {
      if (newVal === "/") {
        console.log("首页");
        this.active = 0;
        window.document.title = "首页";
      } else if (newVal === "/classify") {
        console.log("分类");
        this.active = 1;
        window.document.title = "分类";
      } else if (newVal === "/cart") {
        console.log("购物车");
        this.active = 2;
        window.document.title = "购物车";
      } else if (newVal === "/mine") {
        console.log("我的");
        this.active = 3;
        window.document.title = "我的";
      } else if (newVal === "/login") {
        console.log("登录");
        window.document.title = "登录";
      }
    }
  }
};
</script>


<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.text-oh {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.dblock {
  display: block;
}
img {
  display: block;
}
.flex {
  display: flex;
}
.just-center {
  justify-content: center;
}
.just-between {
  justify-content: space-between;
}
.oh {
  overflow: hidden;
}
.van-button--danger {
  background: #6d1786 !important;
  border: 0 !important;
}
li {
  list-style: none;
}
.van-loading {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 10px;
  border-radius: 3px;
}

#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;

  .content {
    padding-bottom: 50px;
    // height: 100%;
    background: #ededed;
  }
}

.top-title {
  margin-bottom: 15px;
  span {
    font-size: 12px;
    font-family: PingFangSC-Regular;
  }
  span:first-child {
    color: #000;
  }
  span:last-child {
    color: #999999;
  }
}
.proPic-box div {
  width: 100% !important;
  height: auto !important;
}
.proPic-box img {
  width: 100% !important;
}
.minirefresh-totop {
  bottom: 80px !important;
}
.last {
  font-size: 12px;
  color: #b2b2b2;
  text-align: center;
  width: 100% !important;
  padding: 15px 0;
  position: relative;
}
.last::before,
.last::after {
  content: "";
  content: "";
  display: block;
  height: 1px;
  width: 30px;
  position: absolute;
  top: 50%;
  background: #b2b2b2;
}
.last::before {
  left: 20%;
}
.last::after {
  right: 20%;
}
.upwrap-tips {
  display: none !important;
}
button.van-button {
  font-size: 14px;
}

</style>
