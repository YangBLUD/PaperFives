import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/start/Login.vue'
import Register from '../components/start/Register.vue'
import Home from '../components/home.vue'
import mainPage from '../components/mainPage.vue'
import advSearch from '../components/search/advSearch.vue'
import User from '../views/User.vue'
import Info from '../views/UserInfo.vue'
import Visitor from '../views/Visitor.vue'
import Paper from '../views/Paper.vue'
import Message from '../views/MessageView.vue'
import PaperReview from '../views/PaperReview.vue'
import PaperUpload from '../views/PaperUpload.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/home',
    component: Home,
    redirect: '/main',
    children: [
      { path: '/main', component: mainPage },
      { path: '/advsearch', component: advSearch },
      { path: '/user', component: User },
      { path: '/info', component: Info },
      { path: '/visitor', component: Visitor },
      { path: '/paper', component: Paper },
      { path: '/message', component: Message },
      { path: '/paperreview', component: PaperReview},
      { path: '/paperupload', component: PaperUpload},
      { path: '/admin', component: Admin}
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