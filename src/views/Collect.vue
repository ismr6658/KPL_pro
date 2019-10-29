<template>
  <!-- 我的收藏 -->
  <div class="collect-box">
    <ul>
      <li class="flex" v-for="(item, index) in collectList" :key="index">
        <img :src="item.sku_img" alt="" @click="goProDetails(item)" />
        <div class="name-box">
          <h3 class="text-oh" @click="goProDetails(item)">
            {{ item.sku_name }}
          </h3>
          <!-- <h4 class="text-oh">小米45寸智能电视</h4> -->
          <h5><i>￥</i>{{ item.price }}</h5>
        </div>
        <div class="close" @click="detelePro(item)" style="padding-left:10px;">
          <van-icon name="delete" size="22px" style="line-height:3" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Mixin from "@/mixin";
export default {
  name: "Pop",
  inject: ["reload"],
  mixins: [Mixin],
  data() {
    return {
      collectList: []
    };
  },
  methods: {
    detelePro(p) {
      /* 删除收藏 */
      var _this = this;
      _this.$dialog
        .confirm({
          message: "亲，确定要取消收藏么",
          confirmButtonColor: "#6d1786"
        })
        .then(() => {
          _this.axios
            .get("/kplapi/mine/deleterCollect?collectId=" + p.id)
            .then(function(res) {
              console.log(res);
              var body = res.data.body;
              if (res.data.code == 1) {
                _this.$toast.success("删除成功");
                _this.reload();
              } else {
                _this.$toast(res.data.msg);
              }
            })
            .catch(function(err) {
              _this.$toast("亲，系统正在开小差哟！");
            });
        })
        .catch(() => {
          console.log("取消删除");
        });
    }
  },
  created() {
    var _this = this;
    _this.axios
      .get("/kplapi/mine/getCollectList")
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        if (res.data.code == 1) {
          if (body.length == 0) {
            _this.$toast('暂无收藏商品');
            
          }
          _this.collectList = body;
        } else {
          _this.$toast(res.data.msg);
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
.collect-box {
  padding: 9px 8px 50px;
  ul {
    li {
      width: 100%;
      padding: 22px 23px 24px 13px;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 9px;
      img {
        width: 74px;
        height: 74px;
        border: 1px solid #b2b2b2;
        border-radius: 3px;
        padding: 1px;
      }
      .name-box {
        margin-left: 10px;
        flex: 1;
        h3 {
          font-size: 14px;
          color: #404040;
          margin-bottom: 10px;
          line-height: 16px;
        }
        h4 {
          font-size: 11px;
          color: #818181;
          margin-bottom: 15px;
        }
        h5 {
          font-size: 16px;
          color: #6d1786;
          i {
            font-size: 10px;
            font-style: normal;
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>
