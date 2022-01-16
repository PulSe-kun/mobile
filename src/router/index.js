import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    //路由重定向
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home/city',
    name: 'City',
    component: () => import('@/views/home/city/index.vue')
  },
  {
    path: '/home/search',
    name: 'Search',
    component: () => import('@/views/home/search/index.vue')
  },
  {
    path: '/home/goods',
    name: 'goods',
    component: () => import('@/views/home/goods/index.vue')
  },
  {
    path: '/home/brand',
    name: 'Brand',
    component: () => import('@/views/home/brand/index.vue')
  },
  {
    path: '/home/brand/detailaction',
    name: 'Detailaction',
    component: () => import('@/views/home/brand/detailaction/index.vue')
  },
  {
    path: '/topic',
    name: 'Topic',
    component: () => import('@/views/topic/index.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/topic/detailaction',
    name: 'detailAction',
    component: () => import('@/views/topic/detailaction/index.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category/index.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    //⚡动态路由传参数 也可以 /category/categoryList?id=
    path: '/category/categoryList/:id',
    name: 'CategoryList',
    component: () => import('@/views/category/categoryList/index.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/cart/index.vue')
  },
  {
    path: '/cart/order',
    name: 'Order',
    component: () => import('@/views/cart/order/index.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/mine/index.vue')
  },
  {
    path: '/mine/actions',
    name: 'Actions',
    component: () => import('@/views/mine/actions/index.vue')
  },
  {
    path: '/mine/address',
    name: 'Address',
    component: () => import('@/views/mine/address/index.vue'),
  },
  {
    path: '/mine/address/addressEdit',
    name: 'addressEdit',
    component: () => import('@/views/mine/address/addressEdit/index.vue')
  },
  {
    path: '/mine/collect',
    name: 'Collect',
    component: () => import('@/views/mine/collect/index.vue')
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/info/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
