import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Weather from '../views/Weather.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/posts', component: Posts },
  { path: '/weather', component: Weather },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
