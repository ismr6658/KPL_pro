<template>
  <!-- 我的收藏 -->
  <div class="collect-box"></div>
</template>

<script>
export default {
  name: "Pop",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    /* Post 方式 */
    _this.axios
      .post("/kplapi/cart/addReduceCart", {
        skuId: _this.cartList[n].sku_id,
        platUserId: 1,
        num: _this.cartList[n].num
      })
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        if (res.data.code == 1) {
        } else {
          _this.$toast("亲，系统正在开小差哟！");
        }
      })
      .catch(function(err) {
        _this.$toast("亲，系统正在开小差哟！");
      });

    /* Get 方式 */
    _this.axios
      .get("/kplapi/main/skuDetail?skuId=" + _this.proId + "&platUserId=1")
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        if (res.data.code == 1) {
        } else {
          _this.$toast("亲，系统正在开小差哟！");
        }
      })
      .catch(function(err) {
        _this.$toast("亲，系统正在开小差哟！");
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
