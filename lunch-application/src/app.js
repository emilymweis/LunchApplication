import Vue from 'vue'
import store from './vuex/index.js'
import AppLayout from './theme/Layout.vue'
import router from './router'

import VueOnToast from 'vue-on-toast'
import AppHeader from './theme/AppHeader.vue'
import LoadingIndicator from './theme/LoadingIndicator.vue'

Vue.use(VueOnToast)

Vue.component('appHeader-comp', AppHeader)
Vue.component('loading-indicator', LoadingIndicator)

const app = new Vue({
  router,
  ...AppLayout,
  store
})

export { app, router, store }
