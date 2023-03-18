import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/pages/HomePage.vue'
import SearchPage from '../components/pages/SearchPage.vue'

// create router here
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/search',
    name: 'searchPage',
    component: SearchPage,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
