// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// import Vue Material
import 'vue-material/dist/vue-material.css'
import VueMaterial from 'vue-material'

Vue.use(VueMaterial)
Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  }
})

// import HandyNote components
import App from '@/App'
import Model from '@/models'
import router from '@/router'
import * as filters from '@/util/filters'

Vue.config.productionTip = false

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
