import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard/home' },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard.vue'),
      children: [
        {
          path: '/dashboard/home',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/dashboard/crud',
          name: 'crud',
          component: () => import('../views/CRUD.vue')
        },
        {
          path: '/dashboard/roles',
          name: 'roles',
          component: () => import("../views/roles.vue")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('../views/Register.vue')
    },
  ]
})

export default router
