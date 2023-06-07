import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入全局样式表
import './assets/css/global.css'

// 导入字体图标
import './assets/fonts/iconfont.css'
import './assets/fonts/Fonts.css'

// 配置请求
import axios from 'axios'
// axios.defaults.baseURL='http://81.70.161.76:5000/api/v1/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios

// Vue head injection
import VueHead from 'vue-head';
Vue.use(VueHead);

// LaTeX dependency
import MathJax, { initMathJax, renderByMathjax } from 'mathjax-vue'

// function onMathJaxReady() {
//     const maths = document.getElementsByClassName('mathjax');
//     for (var i = 0; i < maths.length; i++) {
//         console.log(maths[i]);
//         renderByMathjax(maths[i]);
//     }
// }
// initMathJax({}, onMathJaxReady);

Vue.use(MathJax);
Vue.use(store)


new Vue({
    router,
    store,
    render: h => h(App),
    // Inject header for MathJax
    head: {
        title() {
            return {
                inner: this.title
            }
        }
    }
}).$mount('#app')

