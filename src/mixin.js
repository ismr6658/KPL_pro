export default {
    methods: {
        goProDetails(n) { /* 点击获取商品详情 */
            var _this = this;
            localStorage.setItem('proId', JSON.stringify(n.sku_id))
            _this.$router.push("/introdution");
        },
        getGuessLikeShop() {/* 获取猜你喜欢商品列表 */

        },
        getFreight(a, b) {
            var _this = this;
            /* 获取运费 */
            var s = [];
            b.forEach(function (item, index) {
                var n = {};
                n["skuid"] = item.sku_id;
                n["num"] = item.num == undefined ? 1 : item.num;
                s.push(n);
            });
            _this.axios
                .get("/kplapi/main/freight?platUserAddrId=" + a + "&skus=" + JSON.stringify(s))
                .then(function (res) {
                    console.log(res);
                    var body = res.data.body;
                    if (res.data.code == 1) {
                        window.localStorage.setItem('freight', JSON.stringify(body))
                        _this.$router.push("/mine/order/confirmorder");
                    } else {
                        _this.$toast("亲，请先添加地址哦");
                        _this.$router.push('/mine/addresslist')
                    }
                })
                .catch(function (err) {
                    _this.$toast("亲，系统正在开小差哟");
                });
        },
      

    }

}