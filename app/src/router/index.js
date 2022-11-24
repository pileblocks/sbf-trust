import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:affiliateAddress?',
    name: 'home',
    component: HomeView
  },
  {
      path: '/game/:id',
      name: 'game',
      component: HomeView
  },
]

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

export default router
