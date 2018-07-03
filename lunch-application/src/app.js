import Vue from 'vue'
import store from './vuex/index.js'
import AppLayout from './theme/Layout.vue'
import router from './router'

import VueOnToast from 'vue-on-toast'
import BootstrapVue from 'bootstrap-vue'
import AppHeader from './theme/AppHeader.vue'
import LoadingIndicator from './theme/LoadingIndicator.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueOnToast)

Vue.component('appHeader-comp', AppHeader)
Vue.component('loading-indicator', LoadingIndicator)

const app = new Vue({
  router,
  ...AppLayout,
  store
})

export { app, router, store }
