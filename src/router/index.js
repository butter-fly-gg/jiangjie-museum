import { createRouter, createWebHistory } from 'vue-router'

// 导入所有页面组件
import CoverPage from '../views/CoverPage.vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import TravelPage from '../views/TravelPage.vue'
import TravelVolunteer from '../views/TravelVolunteer.vue'
import TravelShop from '../views/TravelShop.vue'
import TravelShop_1 from '../views/TravelShop_1.vue'
import BeautifulPage from '../views/BeautifulPage.vue'
import BeautifulMap from '../views/BeautifulMap.vue'
import BeautifulAR from '../views/BeautifulAR.vue'
import BeautifulAR_1 from '../views/BeautifulAR_1.vue'
import MinePage from '../views/MinePage.vue'
import MineBook from '../views/MineBook.vue'
import MineBook_1 from '../views/MineBook_1.vue'
import FlowerPage from '../views/FlowerPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/cover'
  },
  {
    path: '/cover',
    name: 'Cover',
    component: CoverPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
 {
     path: '/home',
     name: 'Home',
    component: HomePage
  },
  {
    path: '/travel',
    name: 'Travel',
    component: TravelPage
  },
  {
    path: '/travel/volunteer',
    name: 'TravelVolunteer',
    component: TravelVolunteer
  },
  {
    path: '/travel/shop',
    name: 'TravelShop',
    component: TravelShop
  },
  {
    path: '/travel/shop/detail',
    name: 'TravelShop_1',
    component: TravelShop_1
  },
  {
    path: '/beautiful',
    name: 'Beautiful',
    component: BeautifulPage
  },
  {
    path: '/beautiful/map',
    name: 'BeautifulMap',
    component: BeautifulMap
  },
  {
    path: '/beautiful/ar',
    name: 'BeautifulAR',
    component: BeautifulAR
  },
  {
    path: '/beautiful/ar/detail',
    name: 'BeautifulAR_1',
    component: BeautifulAR_1
  },
  {
    path: '/mine',
    name: 'Mine',
    component: MinePage
  },
  {
    path: '/mine/book',
    name: 'MineBook',
    component: MineBook
  },
  {
    path: '/mine/book/detail',
    name: 'MineBook_1',
    component: MineBook_1
  },
  {
    path: '/flower',
    name: 'Flower',
    component: FlowerPage
  },
   // 临时占位路由
  { path: '/activity', name: 'Activity', component: { template: '<div>页面建设中...</div>' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router