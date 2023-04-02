import { createRouter, createWebHashHistory } from 'vue-router'


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
    component: () => import('@/components/pages/PlaylistPage.vue'),
    meta: { transition: 'slide-up', id: 3 },
  },
  {
    path: '/collaborator',
    name: 'collaborator page',
    component: () => import('@/components/pages/CollaboratorPage.vue'),
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
