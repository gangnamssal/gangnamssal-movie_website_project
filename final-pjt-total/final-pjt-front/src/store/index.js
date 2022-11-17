import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'
const API_KEY = '42584510a0a43e09681fec8c6f36f050'
const LANGUAGE = 'ko-kr'
const REGION = 'KR'

export default new Vuex.Store({
  state: {
    popularMovie: null,
    genres: null,
    genrepopularMovie: null,
    topRatedMovie: [],
    upcommingMovie: null,
  },
  getters: {
  },
  mutations: {
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
    }
    
  },
  actions: {
    getPopularMovie(context) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: {
          api_key: API_KEY,
          language: LANGUAGE
        }
      })
        .then((res) => {
          // console.log(res.data.results)
          context.commit('GET_POPULAR_MOVIE',res.data.results)
        })
    },
    getGenres(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/genres/`,
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
    }
  },
  modules: {
  }
})
