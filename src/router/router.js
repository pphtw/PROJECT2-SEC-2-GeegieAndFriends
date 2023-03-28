import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/pages/HomePage.vue'
import SearchPage from '../components/pages/SearchPage.vue'
import PlaylistPage from '../components/pages/PlaylistPage.vue'

// create router here
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { transition: 'slide-up', id: 1 },
  },
  {
    path: '/search',
    name: 'searchPage',
    component: SearchPage,
    meta: { transition: 'slide-up', id: 2 },
  },
  {
    path: '/playlist',
    name: 'PlaylistPage',
    component: PlaylistPage,
    meta: { transition: 'slide-up', id: 3 },
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to, from) => {
  to.meta.transition = to.meta.id > from.meta.id ? 'slide-up' : 'slide-down'
  from.meta.transition = to.meta.id > from.meta.id ? 'slide-up' : 'slide-down'
})

export default router
