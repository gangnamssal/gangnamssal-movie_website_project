import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    popularMovie: null,
  },
  getters: {
  },
  mutations: {
    GET_POPULAR_MOVIE(state, movie) {
      state.popularMovie = movie
    }
  },
  actions: {
    getPopularMovie(context) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: {
          api_key: '42584510a0a43e09681fec8c6f36f050',
          language: 'ko-kr'
        }
      })
        .then((res) => {
          console.log(res.data.results)
          context.commit('GET_POPULAR_MOVIE',res.data.results)
        })
    }
  },
  modules: {
  }
})
