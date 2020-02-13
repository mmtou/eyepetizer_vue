import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Iframe from '@/views/Iframe.vue'
import Video from '@/views/Video.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/video/:id',
    name: 'video',
    component: Video
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: Iframe
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/eyepetizer/',
  routes
})

export default router
