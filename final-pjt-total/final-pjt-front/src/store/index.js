import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import createPersistedState  from 'vuex-persistedstate'
import router from '../router'

Vue.use(Vuex)

const DJANGO_URL = 'http://127.0.0.1:8000'
const API_KEY = '42584510a0a43e09681fec8c6f36f050'
const LANGUAGE = 'ko-kr'
const REGION = 'KR'

export default new Vuex.Store({
  plugins:[
    createPersistedState()
  ],
  state: {
    // totalMovie: null,
    popularMovie: null,
    genres: null,
    genrepopularMovie: null,
    topRatedMovie: [],
    upcommingMovie: null,
    nowPlayingMovie: null,
    Token:null,
    userInfo: null,
    detailMovie: null,
  },
  getters: {
  },
  mutations: {
    // GET_TOTAL_MOVIE(state, movie) {
    //   state.totalMovie = movie
    // },
    GET_POPULAR_MOVIE(state, movie) {
      state.popularMovie = movie
    },
    GET_GENRES(state, genres){
      state.genres = genres
    },
    GET_GENRE_MOVIE(state,movie){
      state.genrepopularMovie = movie
    },
    GET_TOP_RATED_MOVIE(state, movies) {
      state.topRatedMovie.push(...movies)
    },
    GET_UP_COMMING_MOVIE(state, movie) {
      state.upcommingMovie = movie
    },
    GET_NOW_PLAYING_MOVIE(state,movie) {
      state.nowPlayingMovie = movie
    },
    SAVE_TOKEN(state,key){
      state.Token = key
      router.push({ name: 'movie' })
    },
    LOGOUT(state){
      state.Token = null
    },
    GET_USER_INFO(state,userData) {
      state.userInfo = userData
    },
    GET_DETAIL_MOVIE(state, movie) {
      state.detailMovie = movie
    },
    ADD_REVIEW(state, review) {
      state.detailMovie.review_set.push(review)
    },
    DELETE_REVIEW(state, id) {
      state.detailMovie.review_set = state.detailMovie.review_set.filter((review) => {
        return review.id !== id
      })
    },
    SAVE_UPDATE_REVIEW(state, review) {
      state.detailMovie.review_set = state.detailMovie.review_set.map((item) => {
        if (item.id === review.id) {
          item = review
        }
        return item
      })
    }
  },
  actions: {
    // getTotalMovie(context) {
    //   axios({
    //     method: 'get',
    //     url: `${DJANGO_URL}/movies/`,
    //   })
    //     .then((res) => {
    //       console.log(res.data)
    //       context.commit('GET_TOTAL_MOVIE',res.data)
    //     })
    // },
    getPopularMovie(context) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: {
          api_key: API_KEY,
          language: LANGUAGE,
          page: '1',
          region: REGION,
        }
      })
        .then((res) => {
          console.log(res.data.results)
          context.commit('GET_POPULAR_MOVIE',res.data.results)
        })
    },
    getGenres(context) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/genres/`,
      })
        .then((res) => {
          // console.log(res.data)
          // console.log(context)
          context.commit('GET_GENRES', res.data)
        })
    },
    getGenreMovie(context, payload) {
      // console.log(payload)
      const newMovies = context.state.popularMovie.filter((movie) => {
        return movie.genre_ids.includes(payload)
      })
      // console.log(newMovies)
      context.commit('GET_GENRE_MOVIE',newMovies)
    },
    getTopRatedMovie(context) {
      context.state.topRatedMovie = []
      for (let i=1; i<4; i++) {
        axios({
          method: 'get',
          url: 'https://api.themoviedb.org/3/movie/top_rated',
          params: {
            api_key: API_KEY,
            language: LANGUAGE,
            page: `${i}`
          }
        })
          .then((res) => {
            // console.log(res.data.results)
            // console.log(context)
            context.commit('GET_TOP_RATED_MOVIE', res.data.results)
          })
      }
    },
    getUpCommingMovie(context) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/upcoming',
        params: {
          api_key: API_KEY,
          language: LANGUAGE,
          page: '1',
          region: REGION
        }
      })
        .then((res) => {
          // console.log(res)
          // console.log(context)
          const sortedData = _.sortBy(res.data.results,'release_date')
          context.commit('GET_UP_COMMING_MOVIE',sortedData)
        })
    },
    getNowPlayingMovie(context) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
        params: {
          api_key: API_KEY,
          language: LANGUAGE,
          page: '1',
          region: REGION
        }
      })
        .then((res) => {
          const sortedData = _.sortBy(res.data.results,'release_date').reverse()
          context.commit('GET_NOW_PLAYING_MOVIE',sortedData)
        })
    },
    addSignUp(context,payload){
      axios({
        method : 'post',
        url: `${DJANGO_URL}/movies/signup/`,
        data: {
          username: payload.username,
          password1 : payload.password1,
          password2 : payload.password2,
        }
      })
      .then((res)=>{
        // console.log(context)
        // console.log(res.data.key)
        console.log('가입 성공')
        context.commit('SAVE_TOKEN',res.data.key)
      })

    },
    getLogIn(context,payload){
      axios({
        method: 'post',
        url:`${DJANGO_URL}/movies/auth/login/`,
        data: {
          username: payload.username,
          password: payload.password
        }
      })
      .then((res)=>{
        // console.log('성공',context,res)
        console.log('로그인 성공')
        context.commit('SAVE_TOKEN',res.data.key)
        router.push({ name: 'movie' })
      })
    },
    changePassword(context,payload){
      axios({
        method: 'post',
        url:`${DJANGO_URL}/movies/auth/password/change/`,
        data: {
          new_password1: payload.new_password1,
          new_password2: payload.new_password2,
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
      .then(()=>{
        console.log('변경 성공')
        router.push({ name: 'movie' })
      })
    },
    logOut(context){
      axios({
        method:'post',
        url:`${DJANGO_URL}/movies/auth/logout/`,
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
      .then(()=>{
        console.log('로그아웃 성공')
        context.commit('LOGOUT')
      })
    },
    getUserInfo(context) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/auth/user/`,
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          // console.log(res)
          context.commit('GET_USER_INFO',res.data)
        })
    },
    getDetailMovie(context, movie_id) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/${movie_id}/`
      })
        .then((res) => {
          // console.log(res)
          // console.log(context)
          context.commit('GET_DETAIL_MOVIE',res.data)
        })
    },
    addReview(context, payload) {
      axios({
        method: 'post',
        url: `${DJANGO_URL}/movies/${payload.movie_id}/reviews/`,
        data: {
          title: payload.title,
          content: payload.content,
          movie_title: payload.movie_title,
          rank: payload.rank
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          // console.log(res)
          // console.log(context)
          context.commit('ADD_REVIEW',res.data)
        })
    },
    deleteReview(context, id) {
      axios({
        method: 'delete',
        url: `${DJANGO_URL}/movies/reviews/${id}/`,
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then(() => {
          // console.log('성공',res)
          context.commit('DELETE_REVIEW',id)
        })
    },
    saveUpdateReview(context, payload) {
      axios({
        method: 'put',
        url: `${DJANGO_URL}/movies/reviews/${payload.review_id}/`,
        data: {
          title: payload.title,
          content: payload.content,
          rank: payload.rank,
          movie_title : payload.movie_title
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_UPDATE_REVIEW',res.data)
        })
    }
  },
  modules: {
  }
})
