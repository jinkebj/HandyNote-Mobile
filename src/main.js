// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// import Muse-UI
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

Vue.use(MuseUI)

// import HandyNote components
import App from '@/App'
import Model from '@/models'
import router from '@/router'
import * as filters from '@/util/filters'

Vue.config.productionTip = false

// define global event bus
const EventBus = new Vue()
Vue.prototype.$bus = EventBus

// register filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// add request interceptor
Model.getHttpPrototype().interceptors.request.use(
  (config) => {
    config.headers['X-Auth-Token'] = window.localStorage.getItem('hn-token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// add response interceptor
Model.getHttpPrototype().interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = './index.html#/login'
      return error.response
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// redirect to login page if no token cached in local storage
if (window.localStorage.getItem('hn-token') === null) {
  window.location.href = './index.html#/login'
}
