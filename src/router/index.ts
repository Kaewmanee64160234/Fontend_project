import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard fullscreen',
      components: {
        default: () => import('../views/dashboard/DashboardView.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: "FullLayout",
      },
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default: HomeView,
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
        default: () => import('@/views/AboutView.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout'
      }
    },

    {
      path: '/product',
      name: 'product',

      components: {
        default: () => import('../views/products/ProductView.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },

    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/customer/CustomerView.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },

      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },

    {
      path: '/employee',
      name: 'employee',

      components: {
        default: () => import('../views/employees/EmployeeView.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },
    {
      path: '/store',
      name: 'store',

      components: {
        default: () => import('../views/stores/StoreView.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },
    {
      path: '/user',
      name: 'user',

      components: {
        default: () => import('../views/users/UserView.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },
    {
      path: '/material',
      name: 'material',

      components: {
        default: () => import('../views/materials/MaterialsView.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'orders',

      components: {
        default: () => import('../views/order/OrderView.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },
    {
      path: '/order/:id',
      name: 'order',

      components: {
        default: () => import('../views/order/OrderDetail.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },
    {
      path: '/employee/login',
      name: 'employee login',

      components: {
        default: () => import('../views/EmployeeLogin.vue'),
        menu: () => import('@/components/menus/MainMenu.vue'),
        header: () => import('@/components/headers/MainHeader.vue')
      },
      meta: {
        layout: 'MainLayout',
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})
const isLoggedIn = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return true
  } else {
    return false
  }
}
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
