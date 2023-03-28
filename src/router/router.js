import { createRouter, createWebHashHistory } from 'vue-router'
import PlaylistPage from '../components/pages/PlaylistPage.vue'

// create router here
const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=> import('../components/pages/HomePage.vue'),
    meta: { transition: 'slide-up', id: 1 },
  },
  {
    path: '/search',
    name: 'searchPage',
    component: () => import('../components/pages/SearchPage.vue'),
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
