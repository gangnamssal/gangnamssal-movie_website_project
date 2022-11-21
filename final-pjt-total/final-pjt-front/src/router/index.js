import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // Home
    path: '/',
    name: 'movie',
    component: () => import('@/views/HomeView')
  },
  {
    // 인기 영화
    path: '/movie/genre/',
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
  {
    // 로그인
    path: '/movie/login',
    name: 'login',
    component: () => import('@/views/LogInView')
  },
  {
    // 회원가입
    path: '/movie/signup',
    name: 'signup',
    component: () => import('@/views/SignUpView')
  },
  {
    // 비밀번호변경
    path: '/movie/change/password',
    name: 'changepassword',
    component: () => import('@/views/ChangePasswordView')
  },
  {
    // 프로필
    path: '/movie/profile/',
    name: 'profile',
    component: () => import('@/views/ProfileView')
  },
  {
    // 디테일
    path: '/movie/detail/:movie_id',
    name: 'detail',
    component: () => import('@/views/MovieDetail')
  },
  {
    path: '/preference',
    name: 'preference',
    component: () => import('@/views/SignUpPreferenceView')
  },
  {
    path: '/hotmovie',
    name: 'hotmovie',
    component: () => import('@/views/HotRecommendation')
  },
  {
    // 404 page
    path: '/404',
    name: '404NotFound',
    component: () => import('@/views/404NotFound')
  },
  {
    path: '*',
    redirect: { name : '404NotFound'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
