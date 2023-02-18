import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    // {
    //   path: '/upload',
    //   name: 'upload',
    //   component: () => import('../components/homepage/upload.vue')
    // },
    // {
    //   path: '/list',
    //   name: 'list',
    //   component: () => import('../components/homepage/list.vue')
    // },
    // {
    //   path: '/button',
    //   name: 'button',
    //   component: () => import('../components/common/Signin.vue')
    // },
  ]
})

export default router
