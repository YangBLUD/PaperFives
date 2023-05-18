import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/start/Login.vue'
import Regist from '../components/start/Regist.vue'
import Home from '../components/home.vue'
import UserInfo from '../views/UserInfo.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect:'/login' },
  {
    path:'/home',
    component:Home,
    children:[
      {path:'/userinfo',component:UserInfo}
    ]
  },
  { path: '/login', component: Login },
  { path: '/regist', component: Regist },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
