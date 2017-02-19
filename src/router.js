import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Posts from './components/Posts.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/posts', component: Posts },
    { path: '*', component: Home },
  ],
})