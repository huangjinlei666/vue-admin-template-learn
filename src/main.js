import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import router from './router'
import store from './store'
import '@/icons'
import '@/styles/index.scss'
import '@/permission.js'
Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
