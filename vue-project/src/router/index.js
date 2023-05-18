import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/MainView.vue'
import UserInfo from '../views/UserInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: 'userinfo', component: UserInfo }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
