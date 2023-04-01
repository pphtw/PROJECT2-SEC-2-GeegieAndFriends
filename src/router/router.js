import { createRouter, createWebHashHistory } from 'vue-router'
import PlaylistPage from '@/components/pages/PlaylistPage.vue'
import CollaboratorPage from '@/components/pages/CollaboratorPage.vue'

// create router here
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/pages/HomePage.vue'),
    meta: { transition: 'slide-up', id: 1 },
  },
  {
    path: '/search',
    name: 'search page',
    component: () => import('@/components/pages/SearchPage.vue'),
    meta: { transition: 'slide-up', id: 2 },
  },
  {
    path: '/playlist',
    name: 'playlist page',
    component: PlaylistPage,
    meta: { transition: 'slide-up', id: 3 },
  },
  {
    path: '/collaborator',
    name: 'collaborator page',
    component: CollaboratorPage,
    meta: { transition: 'slide-up', id: 4 },
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
