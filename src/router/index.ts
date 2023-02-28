import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
      },
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
      path: "/product",
      name: "product",

      components: {
        default: () => import("../views/products/ProductView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    }
  ]
})

export default router
