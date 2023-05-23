import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/start/Login.vue'
import Register from '../components/start/Register.vue'
import Home from '../components/home.vue'
import UserInfo from '../views/UserInfo.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect:'/login' },
  {
    path:'/home',
    component:Home,
    children:[
      {path:'/userinfo',component:UserInfo},
      {path:'/user',component:User}
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
