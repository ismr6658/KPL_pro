<template>
  <div class="everyday">
    <ul class="flex">
      <li
        class="flex "
        v-for="(day, index) in everyDays"
        :key="index"
        @click="goProDetails(day)"
      >
        <img :src="day.sku_img" alt="" />
        <b>{{ day.sku_name }}</b>
        <span>￥{{ day.price }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Mixin from "@/mixin";
export default {
  name: "Everyday",
  mixins: [Mixin],
  props: {
    everyDays: Array
  },
  mounted() {
    var _this = this;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.everyday {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  ul {
    height: 100%;
    padding-top: 5px;
    li {
      width: 110px;
      flex-shrink: 0;
      flex-direction: column;
      align-items: center;
      img {
        width: 67px;
        height: 67px;
        margin-bottom: 10px;
      }
      b {
        display: block;
        font-size: 13px;
        color: #404040;
        margin-bottom: 6px;
        text-align: center;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 5px;
      }
      span {
        display: block;
        font-size: 12px;
        color: #6d1786;
        width: 100%;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

