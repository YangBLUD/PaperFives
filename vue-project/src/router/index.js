import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/MainView.vue'
import UserInfo from '../views/UserInfo.vue'
import PaperView from '../views/PaperView.vue'
import PaperReview from '../views/PaperReview.vue'
import PaperReviewInfo from '../views/PaperReviewInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: 'userinfo', component: UserInfo },
      { path: 'paperview', component: PaperView },
      { path: 'paperreview', component: PaperReview },
      { path: 'paperreviewinfo', component: PaperReviewInfo }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
