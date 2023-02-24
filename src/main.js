import Vue from 'vue'
// 引入所有页面组件加载对象
import App from './index'
import router from './router'
import VueKinesis from 'vue-kinesis'
import VWave from 'v-wave'

Vue.config.productionTip = false

Vue.use(VueKinesis)
Vue.use(VWave)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
