<template>
  <div class="b_swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.banner_img" class="b_SwiperImg" @click="open(image)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    images: Array
  },
  data() {
    return {};
  },
  methods: {
    open(o) {
      if (o.banner_type == 2) {
        window.localStorage.setItem('proId',o.sku_id)
        this.$router.push('/introdution')
        return
      }
      if (o.banner_type == 3) {
        window.location.href = "http://" + o.html_url;
        return
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.b_swiper {
  height: 100%;
  background: #fff;
  .van-swipe {
    height: 100%;
  }
  .b_SwiperImg {
    width: 100%;
    // height: 100%;
    display: block;
  }
}
</style>
