import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OptimizationView from '../views/OptimizationView.vue'
import trafficmanagementView from '../views/trafficManagementView.vue'
import MaasView from '../views/MaasView.vue'
import OfflineCommerce from '../views/OfflineCommerce.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 智能排班
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      // 线网优化
      path: '/optimization',
      name: 'optimization',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: OptimizationView
    },
    {
      // 城市交通管理
      path: '/trafficmanagement',
      name: 'trafficmanagement',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: trafficmanagementView
    },
    {
      // maas
      path: '/maas',
      name: 'maas',
      component: MaasView
    },
    {
      // 线下商业化
      path: '/offline',
      name: 'offline',
      component: OfflineCommerce
    },
    
  ]
})

export default router
