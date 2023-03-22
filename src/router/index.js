import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import PhotoPage from '@/pages/PhotoPage'
import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainPage,
    name: 'MainPage'
  },
  {
    path: '/photo',
    component: PhotoPage,
    name: 'PhotoPage'
    // component: () => import('../src/pages/PhotosPage')
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
