import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 倒入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import './assets/fonts/Fonts.css'


// 配置请求
import axios from 'axios'
import VueHead from 'vue-head';
// axios.defaults.baseURL='http://81.70.161.76:5000/api/v1/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios

Vue.use(VueHead);

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
        },
        script: [
            // {
            //     type: "application/javascript",
            //     src: 'https://polyfill.io/v3/polyfill.min.js?features=es6',
            // },
            {
                id: 'MathJax-script',
                async: true,
                src: 'https://cdn.jsdelivr.net/npm/mathjax/es5/tex-mml-chtml.min.js?config=TeX-AMS-MML_HTMLorMML'
            }
        ]
    }
}).$mount('#app')

