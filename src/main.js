import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios

// 引入自己封装的接口函数
import request from './api/api'
Vue.prototype.request = request

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
