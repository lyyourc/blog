import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import offlinePlugin from 'offline-plugin/runtime'

import App from './App.vue'
import router from './router'
import OHNO from './plugins/ohno/index'


offlinePlugin.install()

Vue.use(VueProgressBar)
Vue.use(OHNO)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
