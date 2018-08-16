// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/'                 //路由器
import Element from 'element-ui'               //引入饿了么ui框架
import 'element-ui/lib/theme-chalk/index.css'  //引入样式
import axios from 'axios'                      //使用API所需
import querystring from 'querystring'
import './components/components.js'            //加载公共组件脚本
import VueScroller from 'vue-scroller'        //下拉
import VueTouch from 'vue-touch'              //滑动事件
import VDistpicker from 'v-distpicker'          //地址三级联动
import * as filters from './assets/js/filters.js'  //过滤器
import './assets/scss/common.scss'                      //加载公共样式
import common from './assets/js/common.js'            //加载公共脚本
import store from './store/store'
import * as types from './store/types'

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})
Vue.component('v-distpicker', VDistpicker)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueScroller)
Vue.prototype.$qs = querystring;
Vue.prototype.$http = axios
Vue.prototype.$common = common
Vue.use(Element)
Vue.use(VueRouter)


Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
})  

Vue.config.productionTip = false


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
      if (store.state.token) {
        console.log("1");
        console.log(store.state.token);
          next();
      }
      else {
        console.log(store.state.token);
        console.log("2");
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');