<template>
  <div class="login-box">
    <h4>手机号登录</h4>
    <ul>
      <li>
        <input type="text" v-model="phone" placeholder="请输入手机号" />
      </li>
      <li class="flex just-between">
        <input type="text" v-model="sms" placeholder="请输入验证码" />
        <p @click="getSms()" v-if="!again">获取验证码</p>
        <p v-if="again">重新获取 {{ time }}s</p>
      </li>
      <van-button id="yes" @click="bandTel()">确定</van-button>
    </ul>
  </div>
</template>

<script>
import { clearInterval } from "timers";
export default {
  name: "login",
  data() {
    return {
      phone: null,
      sms: null,
      again: false,
      time: 60 /* 倒计时 */,
      timer: null /* 计时器 */
    };
  },
  watch: {
    time(val) {
      var _this = this;
      console.log(val);
    }
  },
  methods: {
    getSms() {
      /* 获取验证码 */
      var _this = this;
      if (!/^1[34578]\d{9}$/.test(_this.phone)) {
        _this.$toast("请先输入正确手机号");
        return;
      }
      _this.again = true;
      let clock = window.setInterval(() => {
        _this.time--;
        if (_this.time < 0) {
          _this.again = false;
          window.clearInterval(clock);
          _this.time = 60;
        }
      }, 1000);
      let postData = _this.$qs.stringify({
        phone: _this.phone
      });
      _this.axios
        .post("/kplapi/mine/getCode", postData)
        .then(function(res) {
          console.log(res);
          if (res.data.code == 1) {
          } else {
            _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.$toast("亲，系统开小差了哟！");
        });
    },
    bandTel() {
      /* 登录 或 绑定手机号 */

      var _this = this;
      if (!/^1[34578]\d{9}$/.test(_this.phone)) {
        _this.$toast("请先输入正确手机号");
        return;
      }
      if (_this.sms == null) {
        _this.$toast("请先输入正确验证码");
        return;
      }
       let postData = _this.$qs.stringify({ phone: _this.phone, smsCode: _this.sms });
      _this
        .axios({
          url: "/kplapi/mine/login",
          method: "POST",
          data: postData
        })
        .then(function(res) {
          console.log(res);
          if (res.data.code == 1) {
            _this.$router.push("/mine");
          } else {
           _this.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.$toast("亲，系统开小差了哟！");
        });
    },
    getUrlKey(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
input {
  background: transparent;
  border: 0;
  outline: none;
}
#yes {
  width: 65%;
  height: 37px;
  background: #6d1785;
  color: #fff;
  font-size: 15px;
  line-height: 37px;
  margin: 0 auto;
  display: block;
}
.login-box {
  padding: 42px 23px 50px;
  padding: 2.63rem 1.44rem 3.13rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f5;
  z-index: 2;
  h4 {
    font-size: 15px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 44px;
  }
  ul {
    li {
      border-bottom: 1px solid #e0e0e0;
      padding: 8px 0;
      margin-bottom: 40px;
      p {
        color: #8d8d8d;
      }
      input,
      input:focus,
      p {
        font-size: 12px;
        padding-left: 3px;
      }
    }
  }
}
</style>
