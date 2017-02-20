import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Posts from './components/Posts.vue'
import Post from './components/Post.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/posts', component: Posts },
    { path: '/posts/:id', component: Post },
    { path: '*', component: Home },
  ],
})