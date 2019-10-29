<template>
  <div class="shop-list-box">
    <div class="search flex">
      <!-- 搜索 -->
      <input type="text" id="search" v-model="search" placeholder="请输入商品名称"/><label
        @click="defaultHistory()"
        >搜索</label
      >
    </div>
    <div class="history-box" v-show="isHistory">
      <h4 class="flex just-between">
        <span>搜索历史</span> <span @click="clearHistory()">清空</span>
      </h4>
      <div class="history-list">
        <span
          v-for="(item, index) in searchHistoryList"
          :key="index"
          @click="defaultHistory(item)"
          >{{ item }}</span
        >
      </div>
    </div>

    <Shop :prolists="proList" v-show="!isHistory" />
  </div>
</template>

<script>
import Shop from "@/components/Shop.vue";
export default {
  name: "searchpro",
  components: {
    Shop
  },
  data() {
    return {
      search: "",
      pager: 1,
      proList: [],
      isHistory: true,
      searchHistoryList: []
    };
  },
  methods: {
    clearHistory() {
      var _this = this;
       
      _this.axios
        .post("/kplapi/clazz/clearHistory")
        .then(function(res) {
          console.log(res);
          var body = res.data.body;
          if (res.data.code == 1) {
            _this.searchHistoryList = body;
            _this.$toast.success("已清空");
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("亲，系统开小差了哟！");
        });
    },
    defaultHistory(t) {
      var _this = this;
      _this.pager = 1;
      if (t) {
        _this.search = t;
        _this.isHistory = false;
        _this.minirefresh.triggerDownLoading();
        return false;
      }
      if (_this.search == "请输入商品名称") {
        _this.$toast("亲，输入搜索内容哟");
        return false;
      }
      _this.isHistory = false;
      _this.minirefresh.triggerDownLoading();
    }
  },
  created() {
    var _this = this;
  },

  mounted() {
    var _this = this;
    /* 获取历史记录 */
    _this.axios
      .get("/kplapi/clazz/searchHistory")
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        if (res.data.code == 1) {
          _this.searchHistoryList = body;
        } else {
          _this.$toast(res.data.msg);
        }
      })
      .catch(function(err) {
        _this.$toast("亲，系统开小差了哟！");
      });
    /* 搜索 */
    _this.minirefresh = new MiniRefresh({
      container: "#minirefresh",
      down: {
        callback: function() {
          _this.axios
            .get("/kplapi/clazz/getSkuList", {
              params: {
                thirdClazzId: "", //_this.$route.query.clazzId
                keyword: _this.search,
                priceSort: "",
                saleSort: "",
                composite: "",
                pagerNumber: 1
              }
            })
            .then(function(res) {
              console.log(res);
              var body = res.data.body;
              if (res.data.code == 1) {
                _this.proList = body.list;
                _this.minirefresh.endDownLoading();
              }else{
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
                keyword: _this.search,
                priceSort: "",
                saleSort: "",
                composite: "",
                pagerNumber: _this.pager
              }
            })
            .then(function(res) {
              console.log(res);
              var body = res.data.body;
              if (res.data.code == 1) {
                if (body.list.length == 0) {
                  _this.$toast("没有更多数据了哦");
                  _this.minirefresh.endUpLoading(true);
                  return;
                }
                _this.proList = _this.proList.concat(body.list);
                _this.minirefresh.endUpLoading(
                  body.list.length == 0 ? true : ""
                );
              }else{
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
    // _this.minirefresh.triggerDownLoading();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.shop-list-box {
  padding-bottom: 50px;
  height: 100%;
  .search {
    width: 100%;
    height: 40px;
    padding: 7px 17px;
    background: #fff;
    #search {
      border: 0;
      background: #ededed;
      //   width: 100%;
      height: 100%;
      resize: none;
      display: block;
      color: #b2b2b2;
      font-size: 14px;
      text-align: center;
      flex: 1;
    }
    label {
      font-size: 13px;
      color: #404040;
      line-height: 28px;
      padding-left: 15px;
    }
  }
  .history-box {
    padding: 10px 17px;
    h4 {
      margin-bottom: 20px;
      span {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(64, 64, 64, 1);
      }
      span:nth-child(2) {
        font-size: 12px;
        margin-right: 15px;
      }
    }
    .history-list {
      span {
        padding: 6px 10px;
        font-size: 13px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        background: rgba(237, 237, 237, 1);
        border-radius: 4px;
        margin-right: 30px;
        margin-bottom: 10px;
        display: inline-block;
      }
    }
  }
}
</style>
