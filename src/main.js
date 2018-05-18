// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'
import { stat } from 'fs';

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: 'static/loading-svg/loading-bars.svg'
})
Vue.use(VueInfiniteScroll)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo(state, nickName){
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount){
      state.cartCount += cartCount;
    },
    initCartCount(state, cartCount){
      state.cartCount = cartCount;
    }
  }
})

//全局过滤器，格式化价格
Vue.filter('currency', currency);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
