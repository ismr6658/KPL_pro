<template>
  <!-- 分类 -->
  <div class="about oh">
    <div class="nav-left oh">
      <ul>
        <li
          :class="{ activeClassify: pitch == index }"
          v-for="(item, index) in firstClassifys"
          :key="index"
          @click="changeLevel(item, index)"
        >
          {{ item.plat_cate_name }}
        </li>
      </ul>
    </div>
    <div class="nav-right oh">
      <div class="poster">
        <img src="@/assets/timg.jpg" alt="" />
      </div>
      <div
        class="classify-box"
        v-for="(second, index) in secondClassifys"
        :key="index"
      >
        <!-- <div class="level-box"></div> -->
        <h6>{{ second.plat_cate_name }}</h6>
        <ul>
          <li
            v-for="(three, index) in second.subCateList"
            :key="index"
            @click="shopinfo(three.plat_cate_id)"
          >
            <img :src="three.cate_img" alt="" />
            <p class="text-oh">{{ three.plat_cate_name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <van-loading type="spinner" v-show="isLoading" size="50px" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      pitch: 0,
      firstClassifys: [],
      secondClassifys: []
    };
  },
  methods: {
    changeLevel(item, index) {
      var _this = this;
      _this.pitch = index;
      _this.isLoading = true;
      _this.axios
        .get("/kplapi/clazz/clazzByOne?firstCateId=" + item.plat_cate_id)
        .then(function(res) {
          console.log(res);
          var body = res.data.body;

          if (res.data.code == 1) {
            // console.log(body);
            _this.isLoading = false;
            _this.secondClassifys = body;
          }else{
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          _this.$toast("连接错误哦！！！");
        });
    },
    shopinfo(n) {
      var _this = this;
      _this.$router.push({
        path: "/classify/commodity",
        name: "commodity",
        query: {
          clazzId: n
        }
      }); //跳转商品列表页
    }
  },

  mounted() {
    var _this = this;
    _this.isLoading = true;
    _this.axios
      .get("/kplapi/clazz/fristclazz")
      .then(function(res) {
        console.log(res);
        var body = res.data.body;
        if (res.status == 200 && res.data.code == 1) {
          _this.isLoading = false;
          _this.firstClassifys = body.firstCateList;
          _this.secondClassifys = body.secondThirdCateList;
        } else {
          _this.$toast(res.data.msg);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.activeClassify {
  font-size: 16px !important;
  color: #651e7c !important;
}
.about {
  height: 100%;
  padding-bottom: 50px;
  position: relative;
  background: #f5f5f5;
  .nav-left {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 77px;
    background: #eaeaea;
    padding-bottom: 50px;
    padding-top: 20px;
    ul {
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
      &::-webkit-scrollbar {
        width: 0;
        height: auto;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.6);
        display: none;
      }
      &:hover::-webkit-scrollbar-thumb {
        display: block;
      }
      li {
        // height: 50px;
        line-height: 35px;
        text-align: center;
        font-size: 14px;
        color: #000;
      }
    }
  }
  .nav-right {
    width: 100%;
    padding: 9px 8px 5px 84px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    /* 海 报 start */
    .poster {
      width: 100%;
      height: 90px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    /* 海 报 end */
    /* 分类列表 start */
    .classify-box {
      background: #fff;
      margin-top: 5px;
      width: 100%;
      padding: 12px;
      h6 {
        font-size: 14px;
        color: #404040;
        line-height: 14px;
        margin-bottom: 18px;
      }
      ul {
        //  flex-wrap: wrap;
        width: 100%;
        overflow: hidden;
        li {
          width: 33%;
          height: 100px;
          overflow: hidden;
          float: left;
          img {
            width: 60px;
            height: 60px;
            display: block;
            margin: 0 auto 4px;
          }
          p {
            width: 100%;
            text-align: center;
            font-size: 11px;
            color: #8d8d8d;
          }
        }
      }
    }
    /* 分类列表 end */
  }
}
</style>


