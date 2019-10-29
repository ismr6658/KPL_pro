import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'//首页
import Classify from './views/Classify.vue'//分类页
import Cart from './views/Cart.vue'//购物车页
import Mine from './views/Mine.vue'//个人中心页
import Info from './views/Info.vue'//详情页
import Commodity from './views/Commodity.vue'//商品列表页
import Introdution from './views/Introdution.vue'//商品列表页
import Login from './views/Login.vue'//登录页
import Collect from './views/Collect.vue'//收藏页
import Addresslist from './views/Addresslist.vue'//收藏页
import Order from './views/Order.vue'//我的订单页
import Confirmorder from './views/Confirmorder.vue'//确认订单页
import Expressdetail from './views/Expressdetail.vue'//物流详情页
import Orderdetail from './views/Orderdetail.vue'//订单详情页
import Searchpro from './views/Searchpro.vue'//搜索页




Vue.use(Router)

export default new Router({
  mode: 'hash',

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/classify',
      name: 'classify',
      component: Classify
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
    },
    {
      path: '/mine/info',
      name: 'info',
      component: Info
    },
    {
      path: '/classify/commodity',
      name: 'commodity',
      component: Commodity,
     
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/introdution',
      name: 'introdution',
      component: Introdution
    },
    {
      path: '/mine/collect',
      name: 'collect',
      component: Collect
    },
    {
      path: '/mine/addresslist',
      name: 'addresslist',
      component: Addresslist
    },
    {
      path: '/mine/order',
      name: 'order',
      component: Order
    },
    {
      path: '/mine/order/confirmorder',
      name: 'confirmorder',
      component: Confirmorder
    },
    {
      path: '/mine/order/expressdetail',
      name: 'expressdetail',
      component: Expressdetail
    },
    {
      path: '/mine/order/orderdetail',
      name: 'orderdetail',
      component: Orderdetail
    },
    {
      path: '/searchpro',
      name: 'searchpro',
      component: Searchpro
    }
  ]
})
