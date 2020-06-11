import Vue from 'vue'
import App from './App.vue'
import Router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'



// 重置样式 和 公用样式
import './assets/styles/reset.css'
import './assets/styles/common.css'



Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
// 全局定义时间过滤器
Vue.filter('dataFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // return `yyyy-mm-dd hh:mm:ss`
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  render: h => h(App),
  router:Router
}).$mount('#app')
