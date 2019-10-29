import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: '1',
    everydayList: [],
    orderDetails: {},
    sku: [],
    defaultAddr:{}
  },
  mutations: {
    getOrder(state, o) {
      state.orderDetails = o
    },
    setSku(state, o) {
      state.sku = o
    },
    setAddr(state, o) {
      state.defaultAddr = o
    }
  },
  actions: {
    getOrder({ commit }, o) {
      commit('getOrder', o)
    },
    setSku({ commit }, o) {
      commit('setSku', o)
    },
    setAddr({ commit }, o) {
      commit('setAddr', o)
    }
  }
})
