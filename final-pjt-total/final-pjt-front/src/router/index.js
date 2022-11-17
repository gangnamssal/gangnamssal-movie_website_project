import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // Home
    path: '/movie',
    name: 'movie',
    component: () => import('@/views/HomeView')
  },
  {
    // 인기 영화
    path: '/movie/genre',
    name: 'genre',
    component: () => import('@/views/MovieGenre')
  },
  {
    // 명작
    path: '/movie/toprated',
    name: 'toprated',
    component: () => import('@/views/MovieTopRate')
  },
  {
    // 개봉 예정
    path: '/movie/upcomming',
    name: 'upcomming',
    component: () => import('@/views/MovieUpComming')
  },
  {
    // 현재 상영중
    path: '/movie/nowplaying',
    name: 'nowplaying',
    component: () => import('@/views/MovieNowPlaying')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
