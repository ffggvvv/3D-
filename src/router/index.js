import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import jd from "../page/jd.vue"

NProgress.configure({  
  easing: 'ease', // 动画方式 
  speed: 500, // 递增进度条的速度 
  showSpinner: false, // 是否显示加载ico 
  trickleSpeed: 200, // 自动递增间隔 
  minimum: 0.3 // 初始化时的最小百分比
 })

Vue.use(Router)
const Home = () => import('../page/index')
const TT = () => import('../page/tt')

const router = new Router({
  mode: 'history', 
  routes: [
    { path: '/', redirect: "/home" },
    { path: '/home', component: Home },
    { path: '/tt', component: TT },
  ]
})

// 路由页面访问权限拦截
// router.beforeEach((to, from , next) => {
//     // 每次切换页面时，调用进度条
//     NProgress.start();
//     // let jdd = document.getElementsByClassName("jdd")[0]
//     // jdd.style.display = "block"
//     // console.log(jdd);
//        // 若加载时间长且不定，担心进度条走完都没有加载完，可以调用
//        NProgress.inc(); //这会以随机数量递增，且永远达不到100%，也可以设指定增量
//        setTimeout(() => {
//         next();
//        }, 8000);
       
//    });
//    //当路由进入后：关闭进度条
//    router.afterEach(() => { 
//     // 在即将进入新的页面组件前，关闭掉进度条
//     NProgress.done()
//    })
export default router