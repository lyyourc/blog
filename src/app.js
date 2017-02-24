import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

import App from './App.vue'
import router from './router'
import OHNO from './plugins/ohno/index'

Vue.use(VueProgressBar)
Vue.use(OHNO)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
