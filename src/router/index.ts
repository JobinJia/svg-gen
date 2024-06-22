import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
    {
      path: '/svg-render',
      name: 'SvgRender',
      component: () => import('@/views/SvgRender/index.vue'),
    },
  ],
})

export default router
