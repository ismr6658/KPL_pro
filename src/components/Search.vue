<template>
  <div class="search">
    <!-- 搜索 -->
    <input type="text" id="search" v-model="search" @focus="seachinfo" />
  </div>
</template>

<script>
export default {
  name: "search",
  props: ["searchinfo"],
  data() {
    return {
      search: this.searchinfo
    };
  },
  methods: {
    seachinfo() {
      var _this = this;
      _this.$router.push("/searchpro");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.search {
  width: 100%;
  height: 40px;
  padding: 7px 17px;
  background: #f5f5f5;
  #search {
    border: 0;
    background: #ededed;
    width: 100%;
    height: 100%;
    resize: none;
    display: block;
    color: #b2b2b2;
    font-size: 14px;
    text-align: center;
  }
}
</style>
