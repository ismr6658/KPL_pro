<template>
  <div class="shop-list-box">
    <!-- 商品 列表 -->
    <Search :searchinfo="search" />
    <div class="condition-box flex just-between">
      <div class="condition c-all">综合</div>
      <div class="condition c-price">
        价格
        <Tri style="position:absolute;top:7px;right:15px;"></Tri>
        <Tri
          style="position:absolute;top:14px;right:15px;transform:rotate(180deg)"
        ></Tri>
      </div>
      <div class="condition c-sale">
        销量
        <Tri style="position:absolute;top:7px;right:15px;"></Tri>
        <Tri
          style="position:absolute;top:14px;right:15px;transform:rotate(180deg)"
        ></Tri>
      </div>
    </div>
    <Shop :prolists="proList" />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Tri from "@/components/Triangle.vue";
import Shop from "@/components/Shop.vue";
export default {
  name: "commodity",
  components: {
    Search,
    Tri,
    Shop
  },
  data() {
    return {
      search: "请输入商品名称",
      pager: 1,
      priceSort: "",
      saleSort: "",
      composite: "",
      proList: []
    };
  },
  methods: {},
  created() {
    var _this = this;
    console.log(_this.$route.query.clazzId);
  },
  beforeDestroy() {
    // var scrollTop = document.getElementById('minirefresh').scrollTop
    //     console.log(scrollTop)
    // window.localStorage.setItem('commodityHeight',scrollTop)
  },
  mounted() {
    var _this = this;
    _this.minirefresh = new MiniRefresh({
      container: "#minirefresh",
      down: {
        callback: function() {
          _this.pager = 1;
          _this.axios
            .get("/kplapi/clazz/getSkuList", {
              params: {
                thirdClazzId: _this.$route.query.clazzId, //_this.$route.query.clazzId
                keyword: "",
                priceSort: _this.priceSort,
                saleSort: _this.saleSort,
                composite: _this.composite,
                pagerNumber: 1
              }
            })
            .then(function(res) {
              console.log(res);
              var body = res.data.body;
              if (res.data.code == 1) {
                if (body.list.length > 0) {
                  _this.proList = body.list;
                  _this.minirefresh.endDownLoading();
                }else{
                  _this.minirefresh.endDownLoading(true);
                  // _this.$toast("暂无更多数据");
                }
              } else {
                _this.$toast(res.data.msg);
              }
            })
            .catch(function(err) {
              _this.$toast("连接错误哦！！！");
            });
        }
      },
      up: {
        callback: function() {
          _this.pager++;
          _this.axios
            .get("/kplapi/clazz/getSkuList", {
              params: {
                thirdClazzId: "", //_this.$route.query.clazzId
                keyword: "",
                priceSort: _this.priceSort,
                saleSort: _this.saleSort,
                composite: _this.composite,
                pagerNumber: _this.pager
              }
            })
            .then(function(res) {
              console.log(res);
              var body = res.data.body;
              if (res.data.code == 1) {
                if (body.list.length > 0) {
                  _this.proList = _this.proList.concat(body.list);
                  _this.minirefresh.endUpLoading(body.list == [] ? true : "");
                } else {
                  _this.minirefresh.endUpLoading(true);
                  _this.$toast("暂无更多数据");
                }
              } else {
                _this.$toast(res.data.msg);
              }
            })
            .catch(function(err) {
              _this.$toast("连接错误哦！！！");
            });
        }
      }
    });

    /*   触发下拉刷新 */
    _this.minirefresh.triggerDownLoading();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.shop-list-box {
  padding-bottom: 50px;
  .condition-box {
    padding: 7px 32px;
    margin-bottom: 5px;
    .condition {
      width: 72px;
      height: 26px;
      background: #ededed;
      border-radius: 4px;
      line-height: 27px;
      color: #1b1b1b;
      font-size: 13px;
    }
    .c-all {
      text-align: center;
    }
    .c-price,
    .c-sale {
      padding-left: 15px;
      position: relative;
    }
  }
}
</style>
