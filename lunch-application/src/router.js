import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from './theme/Category.vue'
import Login from './theme/Login.vue'
import NotFound from './theme/NotFound.vue'
import Home from './theme/Home.vue'
import EditTopFive from './theme/EditTopFive.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/edittopfive', component: EditTopFive },
    { path: '/category/:id', name: 'category', component: Category },
    { path: '/', redirect: '/category/Home' },
    { path: '*', component: NotFound }
  ]
})

export default router
