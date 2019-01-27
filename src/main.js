import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import './registerServiceWorker'
import SuiVue from 'semantic-ui-vue'


Vue.use(SuiVue);
Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
