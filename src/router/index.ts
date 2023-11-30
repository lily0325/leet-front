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
        },
        {
          path: '/dashboard/execl',
          name: 'execl',
          component: () => import("../views/previewExecl.vue")
        },
        {
          path: '/dashboard/bigfile',
          name: 'bigfile',
          component: () => import("../views/bigFileUpload.vue")
        }, {
          path: '/dashboard/OCR',
          name: 'OCR',
          component: () => import("../views/ocr.vue")
        },
        {
          path: '/dashboard/QRcode',
          name: 'QRcode',
          component: () => import("../views/QRcode.vue")
        },
        {
          path: '/dashboard/lazy',
          name: 'lazy',
          component: () => import("../views/lazyShow.vue")
        }, {
          path: '/dashboard/shopping',
          name: 'shopping',
          component: () => import("../views/shopping.vue")
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
router.beforeEach((to, from) => {
  // console.log(to)

  return true;
})
export default router
