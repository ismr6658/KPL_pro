import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vant from 'vant';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'vant/lib/index.css';
import qs from 'qs';
Vue.prototype.$qs = qs

Vue.use(vant);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
