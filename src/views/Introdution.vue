<template>
  <div class="details">
    <Banner :images="bannerList" />
    <!-- 商品 名称 -->
    <div class="shop-name-box">
      <p>
        <b>￥{{ sku.price }}</b>
        <span @click="collect"
          >收藏
          <van-icon v-show="isCollect == 0" name="like-o" size="11px"/><van-icon
            v-show="isCollect == 1"
            color="#6D1786"
            name="like"
            size="11px"
        /></span>
      </p>
      <h3>
        {{ sku.sku_name }}
      </h3>
    </div>
    <!--商品 规格 -->
    <div class="standard-box">
      <ul>
        <li>
          <!--  @click="pop = true" -->
          <span>规格：65寸-玫瑰金</span>
          <i style="float:right;">
            <van-icon name="arrow" size="12px" style="vertical-align: middle;"
          /></i>
        </li>
        <li @click="changeAddr()">
          <span
            >地址：
            <van-icon
              name="location-o"
              style="    vertical-align: middle;
    margin-bottom: 1px;"
            />
            {{ send.detail_addr }}</span
          >
          <i style="float:right;">
            <van-icon name="arrow" size="12px" style="vertical-align: middle;"
          /></i>
        </li>
      </ul>
    </div>
    <!-- 商品 图片 -->
    <div class="shop-pic-box">
      <div class="proPic-box" v-html="sku.sku_desc"></div>
      <!-- <ul>
        <li v-html="sku.sku_desc"></li>
      </ul> -->
    </div>
    <!-- 商品 规格 -->
    <Pop @hidepop="closepop" v-if="pop" />
    <!-- 寄送 地址 -->
    <Sendaddr @hideaddress="closeAddress" v-if="isAddress" />
    <!-- 底部 操作 按钮 -->
    <van-goods-action>
      <van-goods-action-mini-btn icon="cart-o" text="购物车" @click="goCart" />
      <van-goods-action-big-btn
        text="加入购物车"
        @click="onAddCart(sku.sku_id)"
      />
      <van-goods-action-big-btn
        :style="{ background: isSale }"
        text="立即购买"
        @click="nowBuy()"
      />
    </van-goods-action>
  </div>
</template>
<script>
import Mixin from "@/mixin";
import Banner from "@/components/Banner.vue";
import Pop from "@/components/Pop.vue";
import Sendaddr from "@/components/Sendaddr.vue";
export default {
  name: "Introdution",
  mixins: [Mixin],
  components: {
    Banner,
    Pop,
    Sendaddr
  },
  data() {
    return {
      bannerList: [] /* 商品banner图 */,
      isCollect: 1 /* 是否收藏 */,
      pop: false /* 商品规格 */,
      isAddress: false /* 点击配送地址 */,
      sku: {},
      send: {
        detail_addr: "测试收货地址"
      } /*  配送地址 */,
      isSale: "#6d1786 " /* 是否可售 */,
      addressId: 1 /* 用户地址Id */
    };
  },
  methods: {
    changeAddr() {
      /* 选择配送地址 */
      this.isAddress = true;
    },
    goCart() {
      var _this = this;
      _this.$router.push("/cart");
    },
    nowBuy() {
      /* 立即购买 */
      var _this = this;
      if (_this.isSale == "#ccc") {
        return;
      } else {
        _this.sku["num"] = 1;
        var arrey = [];
        arrey.push(_this.sku);
        _this.getFreight(_this.send.id, arrey);
        // _this.$store.commit("setSku", arrey);
        // _this.$store.commit("setAddr", _this.send);

        window.localStorage.setItem("skuInfo", JSON.stringify(arrey));
        window.localStorage.setItem("addrInfo", JSON.stringify(_this.send));
      }
    },

    onAddCart(skuId) {
      /* 添加购物车 */
      console.log(skuId);
      var _this = this;
      let postData = _this.$qs.stringify({
        skuid: skuId,
        num: 1
      });
      _this.axios
        .post("/kplapi/cart/addReduceCart", postData)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            _this.$toast.success("添加成功哟");
          } else {
            _this.$toast(res.data.msg);
            _this.$router.push("/login");
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟");
        });
    },
    closepop() {
      this.pop = false;
    },
    closeAddress(addr) {
      /* 收货地址 */
      var _this = this;
      console.log(addr);
      if (addr) {
        _this.addressId = addr.id;

        _this.send = addr;
        _this.send["user_name"] = addr.name;
        _this.send["user_phone"] = addr.tel;
        _this.isAddress = false;
      } else {
        _this.isAddress = false;
      }
    },
    collect() {
      /* 收藏操作 */
      var _this = this;
      if (_this.isCollect == 1) {
        _this.$toast("取消收藏");
        _this.isCollect = 0;
        let postData = _this.$qs.stringify({
          skuId: _this.proId
        });
        _this.axios
          .post("/kplapi/main/cancelCollect", postData)
          .then(function(res) {
            console.log(res);
            var body = res.data.body;
            if (res.data.code == 1) {
            } else {
              _this.$toast(res.data.msg);
              _this.$router.push("/login");
            }
          })
          .catch(function(err) {
            _this.$toast("亲，系统正在开小差哟");
          });
        return false;
      }
      if (_this.isCollect == 0) {
        _this.isCollect = 1;
        let postData = _this.$qs.stringify({
          skuId: _this.proId
        });
        _this.axios
          .post("/kplapi/main/collect", postData)
          .then(function(res) {
            console.log(res);
            var body = res.data.body;
            if (res.data.code == 1) {
              _this.$toast.success("已收藏");
            } else {
              _this.$toast(res.data.msg);
              _this.$router.push("/login");
            }
          })
          .catch(function(err) {
            _this.$toast("亲，系统正在开小差哟");
          });
        return false;
      }
    },
    verifyPro(skuId, type, addrId) {
      var _this = this;
      let postData = _this.$qs.stringify({
        skuIds: skuId,
        type: type,
        platUserAddrId: addrId
      });
      _this.axios
        .post("/kplapi/main/verifyPro", postData)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            if (!body.ifSale) {
              _this.isSale = "#ccc";
              _this.$toast(body.msg);
            }
          } else {
            // _this.$toast(res.data.msg);
            //  _this.$router.push('/mine/addresslist')
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟");
        });
    }
  },
  created() {
    var _this = this;
    _this.proId = JSON.parse(window.localStorage.getItem("proId"));
  },
  mounted() {
    var _this = this;
    _this.axios
      .get("/kplapi/main/skuDetail?skuId=" + _this.proId)
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        if (res.data.code == 1) {
          _this.sku = body.sku;
          var obj = {};
          JSON.parse(body.sku.img_list).forEach(item => {
            obj["banner_img"] = item;
            _this.bannerList.push(obj);
          });
          _this.isCollect = body.ifCollect;
          _this.send = body.userAddr;
          _this.addressId = body.userAddr.id;
          _this.verifyPro(_this.proId, 1, body.userAddr.id); /* 商品校验 */
        } else {
          _this.$toast(res.data.msg);
        }
      })
      .catch(function(err) {
        _this.$toast("亲，系统正在开小差哟");
      });
  }
};
</script>
<style lang="less" scoped>
.van-goods-action {
  z-index: 2;
}
.van-button--danger {
  background: #6d1786;
  border: 0;
}
.van-button--warning {
  background-color: #fcb632;
  border: 0;
}

.details {
  padding-bottom: 50px;
  .shop-name-box {
    padding: 13px 23px 13px 17px;
    background-color: #fff;
    p {
      overflow: hidden;
      margin-bottom: 10px;
      b {
        color: #6d1786;
        font-size: 18px;
        font-family: Aleo-Regular;
        float: left;
      }
      span {
        float: right;
        font-size: 11px;
        color: #000000;
      }
    }
    h3 {
      font-size: 13px;
      color: #404040;
      line-height: 16px;
    }
  }
  .standard-box {
    background: #fff;
    margin: 7px 0;
    padding: 0 15px;
    ul {
      position: relative;

      li {
        padding: 10px 12px;
        span {
          font-size: 12px;
          color: #404040;
          line-height: 12px;
          display: inline-block;
          width: 300px;
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
          vertical-align: middle;
        }
      }
    }
    ul:after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: #e0e0e0;
      position: absolute;
      top: 50%;
      left: 0;
    }
  }
  .shop-pic-box {
    width: 100%;
    overflow-x: hidden;
  }
}
</style>

