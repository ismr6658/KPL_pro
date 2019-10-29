<template>
  <div id="cart">
    <ul>
      <li v-for="(item, index) in cartList" :key="index">
        <van-swipe-cell :right-width="65">
          <div class="flex cartUl">
            <van-checkbox
              checked-color="#6d1786"
              style="margin-right:10px;"
              v-model="item.checked"
              @click="getTotal"
            ></van-checkbox>
            <img :src="item.sku_img" alt="" />
            <div class="info-box">
              <h3 class="text-oh">{{ item.sku_name }}</h3>
              <!-- <h4 class="text-oh">小米45寸智能电视</h4> -->
              <h5>
                <i>￥</i><span>{{ item.price }}</span
                >&nbsp;&nbsp;
                <!-- <b>￥{{ item.marking_price }}</b> -->
              </h5>
            </div>
            <div class="handle-box flex">
              <div
                class="handle"
                style="line-height: 18px;"
                @click="onSubNum(index)"
              >
                -
              </div>
              <div class="handle">{{ item.num }}</div>
              <div class="handle" @click="onAddNum(index)">+</div>
            </div>
          </div>
          <span slot="right" class="delate" @click="onDetele(item)">删除</span>
        </van-swipe-cell>
      </li>
    </ul>

    <van-submit-bar :price="total" button-text="结算" @submit="onSubmit">
      <van-checkbox
        checked-color="#6d1786"
        @click="getAllTotal"
        v-model="checked"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>
<script>
import Mixin from "@/mixin";
import { constants } from "crypto";
export default {
  name: "cart",
  mixins: [Mixin],
  inject: ["reload"],
  data() {
    return {
      checked: false,
      total: 0,
      cartList: [],
      isAllTotal: false
    };
  },
  methods: {
    onDetele(o) {
      console.log(o);
      var _this = this;
      _this.$dialog
        .confirm({
          message: "亲，确定要删除该商品么",
          confirmButtonColor: "#6d1786"
        })
        .then(() => {
          let postData = _this.$qs.stringify({
            skuids: o.sku_id
          });
          _this.axios
            .post("/kplapi/cart/deleteCart", postData)
            .then(function(res) {
              console.log(res);
              var body = res.data.body;
              if (res.data.code == 1) {
                _this.$toast.success("删除成功哟");
                _this.reload();
              } else {
                _this.$toast(res.data.msg);
              }
            })
            .catch(function(err) {
              _this.$toast("亲，系统正在开小差哟");
            });
        })
        .catch(() => {
          console.log("取消删除");
        });
    },
    onSubmit() {
      /* 结算 */
      var _this = this;
      if (_this.cartList.length == 0) {
        _this.$toast("购物车为空哟");
        return;
      }
      var arr = [];
      console.log(_this.cartList);
      _this.cartList.forEach(function(item, index) {
        if (item.checked) {
          arr.push(item);
        }
      });

      var addr = JSON.parse(window.localStorage.getItem("addrInfo"));
      if (arr.length == 0) {
        _this.$toast('请先选择要结算的商品');
        return;
      }
      window.localStorage.setItem("skuInfo", JSON.stringify(arr));
      _this.getFreight(addr.id, arr);
    },
    onAddNum(n) {
      /* 购物车加 */
      var _this = this;
      _this.cartList[n].num++;
      console.log(_this.cartList[n].num);
      let postData = _this.$qs.stringify({
        skuid: _this.cartList[n].sku_id,
        num: 1
      });
      _this.axios
        .post("/kplapi/cart/addReduceCart", postData)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            // _this.$toast.success("添加成功哟");
            _this.getTotal();
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟");
        });

      // _this.getCartInfo(1)
    },
    onSubNum(n) {
      /* 购物车减 */
      var _this = this;
      if (_this.cartList[n].num == 1) {
        // _this.cartList.splice(n, 1);
        _this.$toast.fail("不能再减了哦");
        return false;
      }
      _this.cartList[n].num--;
      let postData = _this.$qs.stringify({
        skuid: _this.cartList[n].sku_id,
        num: -1
      });
      _this.axios
        .post("/kplapi/cart/addReduceCart", postData)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            _this.$toast.success("删除成功哟");
            _this.getTotal();
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟");
        });
    },
    getTotal() {
      /* 购物车单项计算总价 */
      var _this = this;
      var t = 0;
      _this.cartList.forEach(function(item, index) {
        if (item.checked) {
          t += parseInt(item.num) * parseFloat(item.price) * 100;
          console.log(item.num);
          console.log(item.price);

          console.log(_this.total);
        }
      });
      _this.total = t;
    },
    getAllTotal() {
      /* 购物车计算总价 */
      var _this = this;
      _this.isAllTotal = !_this.isAllTotal;
      if (_this.isAllTotal) {
        _this.cartList.forEach(function(item, index) {
          item["checked"] = true;
        });
        _this.getTotal();
      } else {
        _this.cartList.forEach(function(item, index) {
          item["checked"] = false;
        });
        _this.getTotal();
      }
    },
    getCartInfo(u) {
      /* 购物车获取 */
      var _this = this;
      _this.axios
        .get("/kplapi/cart/getCart")
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            if (body.length == 0) {
              _this.$toast("购物车是空的哟");
              return;
            }
            body.forEach(function(item, index) {
              item["checked"] = false;
            });
            _this.cartList = body;
          } else {
            _this.$toast(res.data.msg);
            _this.$router.push("/login");
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统正在开小差哟");
        });
    }
  },
  mounted() {
    var _this = this;
    _this.getCartInfo();
  }
};
</script>
<style lang="less" scoped>
.van-submit-bar {
  bottom: 50px;
  padding-left: 20px;
}
.van-button--danger {
  background-color: #6d1786;
  border: 0;
}
.van-submit-bar__price {
  color: #6d1786;
  font-size: 16px;
}

#cart {
  ul {
    padding: 8px 8px 100px;
    li {
      .cartUl {
        width: 100%;
        height: 120px;
        background-color: #ededed;
        border-radius: 6px;
        align-items: center;
        margin-bottom: 8px;
        padding: 0 13px;
        position: relative;

        img {
          width: 80px;
          height: 80px;
          border: 1px solid #b2b2b2;
          border-radius: 4px;
          padding: 1px;
        }
        .info-box {
          margin-left: 12px;
          flex: 1;
          overflow: hidden;
          h3 {
            font-size: 14px;
            color: #404040;
            margin-bottom: 15px;
            line-height: 16px;
          }
          h4 {
            font-size: 11px;
            color: #818181;
            margin-bottom: 15px;
          }
          h5 {
            font-size: 11px;
            color: #b2b2b2;
            line-height: 11px;
            i {
              font-size: 10px;
              font-style: normal;
              color: #6d1786;
              vertical-align: top;
            }
            span {
              font-size: 16px;
              color: #6d1786;
            }
            b {
              font-weight: 100;
              text-decoration: line-through;
            }
          }
        }
        .handle-box {
          position: absolute;
          right: 18px;
          bottom: 25px;
          .handle {
            width: 23px;
            height: 23px;
            text-align: center;
            line-height: 23px;
            border: 1px solid #afafaf;
            font-size: 16px;
            color: #818181;
          }
          .handle:nth-child(2) {
            border: 0;
            min-width: 23px;
            font-size: 14px;
            color: #000;
          }
        }
      }
      .delate {
        text-align: center;
        line-height: 120px;
        display: block;
        width: 64px;
        background: #6d1785;
        color: #fff;
        border-radius: 0 6px 6px 0;
      }
    }
  }
}
</style>

