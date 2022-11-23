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
    APIpopularMovie: null,
    popularMovie: null,
    genres: null,
    preferenceGenre: null,
    selectedPreference: [],
    genrepopularMovie: null,
    topRatedMovie: [],
    upcommingMovie: null,
    nowPlayingMovie: null,
    Token:null,
    userInfo: null,
    detailMovie: null,
    searchingMovie: null,
    HoTMovie:null,
    totalUserProfile: null,
    userProfile: null,
    totalUserPreferGenre: null,
    userPreferGenre: null,
    recommandGenreMovie: null,

    MbtiTable: {
      'INFP' : ['로맨스', '애니메이션', '코미디', '음악', '가족'],
      'ENFP' : ['액션','모험', '코미디', '로맨스', '판타지'],
      'INFJ' : ['드라마', '미스터리', 'SF', '모험'],
      'ENFJ' : ['로맨스', '코미디', '가족', '액션', '모험', 'SF', '범죄'],
      'INTP' : ['SF', '모험', '미스터리', '역사','다큐멘터리', '범죄'],
      'ENTP' : ['코미디', '공포' , '스릴러', '모험', '판타지', 'SF' ,'범죄'],
      'INTJ' : ['미스터리', '범죄', '모험', '판타지', 'SF', '전쟁'],
      'ENTJ' : ['스릴러', '범죄', '모험', '판타지', '역사', '액션', '공포'],
      'ISFJ' : ['다큐멘터리', '역사', '음악', '미스터리', '가족', '로맨스', '코미디'],
      'ESFJ' : ['로맨스', '코미디', '미스터리', '범죄', '가족', '애니메이션'],
      'ISTJ' : ['범죄', '미스터리', '다큐멘터리', '역사', '서부', '드라마'],
      'ESTJ' : ['역사', '서부', '다큐멘터리', '범죄', '가족', '드라마'],
      'ISFP' : ['애니메이션', '판타지', '판타지', 'SF'],
      'ESFP' : ['음악', '애니메이션', '액션', '판타지','코미디', '로맨스', '범죄'],
      'ISTP' : ['코미디', '애니메이션', '로맨스', '액션', '미스터리' ],
      'ESTP' : ['액션', '범죄', '다큐멘터리', '미스터리']
    },
    recommandMbtiMovie: null,
  },
  getters: {
    getProfile(state) {
      return state.totalUserProfile.filter((user) => {
        return user.user === state.userInfo.id
      })
    },
  },
  mutations: {
    GET_POPULAR_MOVIE(state, movie) {
      state.popularMovie = movie
    },
    API_POPULAR_MOVIE(state, movie) {
      state.APIpopularMovie = movie
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
      state.userProfile = null
    },
    GET_USER_INFO(state,userData) {
      state.userInfo = userData
    },
    GET_DETAIL_MOVIE(state, movie) {
      state.detailMovie = movie
      let sortedMovie = _.chain(state.detailMovie.review_set).sortBy('reviewlike_count').reverse()
      state.detailMovie.review_set = [...sortedMovie]
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
    },
    ADD_COMMENT(state, comment) {
      state.detailMovie.review_set = state.detailMovie.review_set.map((review) => {
        if(review.id === comment.review) {
          review.comment_set.push(comment)
        }
        return review
      })
    },
    DELETE_COMMENT(state, payload) {
      state.detailMovie.review_set = state.detailMovie.review_set.map((review) => {
        if (review.id === payload[0]) {
          review.comment_set = review.comment_set.filter((comment) => {
            return !(comment.id === payload[1])
          })
        }
        return review
      })
    },
    ADD_UPDATE_COMMENT(state, payload) {
      state.detailMovie.review_set = state.detailMovie.review_set.map((review) => {
        if (review.id === payload.review) {
          review.comment_set = review.comment_set.map((comment) => {
            if(comment.id === payload.id) {
              comment = payload
            }
            return comment
          })
        }
        return review
      })
    },
    LIKE_MOVIE(state, likeMovie) {
      state.detailMovie.movielike_set.push(likeMovie)
    },
    LIKE_MOVIE_DELETE(state, userId) {
      state.detailMovie.movielike_set = state.detailMovie.movielike_set.filter((like) => {
        return !(like.user === userId) 
      })
    },


// 리뷰 좋아요, 취소
    LIKE_REVIEW(state, likeReview) {
      state.detailMovie.review_set = state.detailMovie.review_set.map((review)=>{
        if (review.id === likeReview.reviewLike){
          review.reviewlike_set.push(likeReview)
        }
        return review
      })
    },
    LIKE_REVIEW_DELETE(state, payload) {
      state.detailMovie.review_set = state.detailMovie.review_set.map((review)=>{
        if (review.id === payload[2]) {
          review.reviewlike_set = review.reviewlike_set.filter((like)=>{
            return !(like.user === payload[0]) 
          })
        }
        return review
      })
    },
    SEARCH_ING(state, titleName) {
      const arr = []
      for (let movie of state.popularMovie) {
        for (let word of movie.title) {
          if (word === titleName || titleName===movie.title || movie.title.includes(titleName)) {
            arr.push(movie)
            break
          }
        }
      }
      state.searchingMovie = arr
    },
    CLOSE_SEARCHING(state) {
      state.searchingMovie = null
    },
    NAME_SORT(state) {
      let sortedMovie = _.chain(state.genrepopularMovie).sortBy('title')
      state.genrepopularMovie = [...sortedMovie]
    },
    POPULARITY_SORT(state) {
      let sortedMovie = _.chain(state.genrepopularMovie).sortBy('popularity').reverse()
      state.genrepopularMovie = [...sortedMovie]
    },
    RELEASED_SORT(state) {
      let sortedMovie = _.chain(state.genrepopularMovie).sortBy('release_date').reverse()
      state.genrepopularMovie = [...sortedMovie]
    },
    GET_PREFERENCE_GENRE(state) {
      if (state.preferenceGenre === null) {
        state.preferenceGenre = state.genres
      }
    },
    SELECTED_PREFERENCE_GENRE(state, seletedGenre) {
      state.preferenceGenre = state.preferenceGenre.filter((genre) => {
        return !(genre.id === seletedGenre.id)
      })
      const data = {
        id: seletedGenre.id,
        name: seletedGenre.name
      }
      state.selectedPreference.push(data) 
    },
    DELETE_SELECTED_GENRE(state, seletedGenre) {
      state.selectedPreference = state.selectedPreference.filter((genre) => {
        return !(genre.id === seletedGenre.id)
      })
      const data = {
        id: seletedGenre.id,
        name: seletedGenre.name
      }
      state.preferenceGenre.push(data) 
    },
    GETHOTMOVIE(state){
      let sortedMovie = _.chain(state.popularMovie).sortBy('movielike_count').reverse()
      let cnt = 0
      const arr = []
      for (let movie of sortedMovie) {
        if (cnt >=20) {
          break
        } else {
          arr.push(movie)
          cnt++
        }
      }
      state.HoTMovie = arr
    },
    GET_PROFILE(state, userData) {
      state.totalUserProfile = userData
    },
    SELECT_GENRE_EXIT(state) {
      state.selectedPreference = []
      state.preferenceGenre = state.genres
    },
    SAVE_PROFILE(state, payload) {
      state.userProfile = payload
      state.selectedPreference = []
      state.preferenceGenre = state.genres
    },
    GET_PROFILE_DETAIL(state,payload) {
      state.userProfile = payload
    },
    SAVE_USER_PREFER_GENRE(state, payload) {
      state.genres = state.genres.map((genre)=>{
        if (genre.id === payload.prefer_genre){
          genre.userprefergenre_set.push(payload)
        }
        return genre
      })
    },
    GET_USER_PREFER_GENRE(state, payload) {
      state.totalUserPreferGenre = payload
    },
    GET_PREFER_GENRE(state) {
      const preferGenre = state.totalUserPreferGenre.filter((genre) => {
        return genre.user === state.userInfo.id
      })
      const genre = []
      for (let i of preferGenre) {
        for (let j of state.genres) {
          if (i.prefer_genre === j.id) {
            genre.push(j.name)
          }
        }
      }
      state.userPreferGenre = genre
    },
    GET_RECOMMAND_GENRE_MOVIE(state) {
      const myGenreId = state.genres.filter((genre) => {
        return state.userPreferGenre.includes(genre.name)
      })
      const recommand = []
      state.popularMovie.forEach((movie) => {
        for (let genre of myGenreId) {
          if (movie.genre_ids.includes(genre.id)) {
            recommand.push(movie)
          }
        }
      })
      // console.log(recommand)
      state.recommandGenreMovie = _.sampleSize(recommand,50)
    },
    GET_RECOMMAND_MBTI_MOVIE(state) {
      const mbti = state.MbtiTable[state.userProfile.mbti]
      const mbtiGenre = []
      for (let mbtigenre of mbti) {
        for (let genre of state.genres) {
          if (mbtigenre === genre.name) {
            mbtiGenre.push(genre)
          }
        }
      }
      const recommand = []
      state.popularMovie.forEach((movie) => {
        for (let genre of mbtiGenre) {
          if (movie.genre_ids.includes(genre.id)) {
            recommand.push(movie)
          }
        }
      })
      // console.log(recommand)
      state.recommandMbtiMovie = _.sampleSize(recommand,50)
    },
    SAVE_UPDATE_PROFILE(state, payload) {
      state.userProfile = payload
    },
    DELETE_USER_PREFER_GENRE(state) {
      state.userPreferGenre = null
    }
  },
  actions: {
    getPopularMovie(context) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/`,
      })
        .then((res) => {
          context.commit('GET_POPULAR_MOVIE',res.data)
        })
    },
    APIPopularMovie(context) {
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
          context.commit('API_POPULAR_MOVIE',res.data.results)
        })
    },
    getGenres(context) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/genres/`,
      })
        .then((res) => {
          context.commit('GET_GENRES', res.data)
        })
    },
    getGenreMovie(context, payload) {
      const newMovies = context.state.popularMovie.filter((movie) => {
        return movie.genre_ids.includes(payload)
      })
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
        router.push({ name: 'movie' })
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
          context.commit('GET_USER_INFO',res.data)
        })
    },
    getDetailMovie(context, movie_id) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/${movie_id}/`
      })
        .then((res) => {
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
          context.commit('SAVE_UPDATE_REVIEW',res.data)
        })
    },
    addComment(context, payload) {
      axios({
        method: 'post',
        url: `${DJANGO_URL}/movies/reviews/${payload[0]}/comments/`,
        data: {
          content:payload[1]
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          context.commit('ADD_COMMENT', res.data)
        })
    },
    deleteComment(context, payload) {
      axios({
        method: 'delete',
        url: `${DJANGO_URL}/movies/comments/${payload[1]}/`,
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then(() => {
          context.commit('DELETE_COMMENT',payload)
        })
    },
    addUpdateComment(context, payload) {
      axios({
        method: 'put',
        url: `${DJANGO_URL}/movies/comments/${payload[1]}/`,
        data: {
          content: payload[2]
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          context.commit('ADD_UPDATE_COMMENT', res.data)
        })
    },
    likeMovie(context, id) {
      axios({
        method: 'post',
        url: `${DJANGO_URL}/movies/${id}/movielike/`,
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          context.commit('LIKE_MOVIE', res.data)
        })
    },
    likeMovieDelete(context, payload) {
      axios({
        method: 'delete',
        url: `${DJANGO_URL}/movies/movielike/${payload[1]}/`
      })
        .then(() => {
          context.commit('LIKE_MOVIE_DELETE', payload[0])
        })
    },

    //리뷰 좋아요, 취소
    likeReview(context, id) {
      axios({
        method: 'post',
        url: `${DJANGO_URL}/movies/${id}/reviewlike/`,
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          console.log(res)
          context.commit('LIKE_REVIEW', res.data)
        })
    },
    likeReviewDelete(context, payload) {
      axios({
        method: 'delete',
        url: `${DJANGO_URL}/movies/reviewlike/${payload[1]}/`
      })
        .then(() => {
          // console.log('성공',context)
          context.commit('LIKE_REVIEW_DELETE', payload)
          // console.log(payload[0])
        })
    },
    getProfile(context) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/profile/`,
      })
        .then((res) => {
          context.commit('GET_PROFILE', res.data)
        })
    },
    saveProfile(context, payload) {
      axios({
        method: 'post',
        url: `${DJANGO_URL}/movies/profile/`,
        data: {
          nickname: payload.nickname,
          mbti: payload.mbti,
          prefer_genre: payload.prefer_genre
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          // console.log(res)
          // console.log('성공')
          context.commit('SAVE_PROFILE',res.data)
        })
        .catch((error) => {
          console.log(error)
          // console.log(context.state.selectedPreference)
        })

    },
    getProfileDetail(context) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/${context.state.userInfo.id}/profile/`
      })
        .then((res) => {
          // console.log(res)
          context.commit('GET_PROFILE_DETAIL', res.data)
        })
    },
    getUserPreferGenre(context) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/userprefergenre/`,
      })
        .then((res) => {
          context.commit('GET_USER_PREFER_GENRE',res.data)
        })
    },
    saveUserPreferGenre(context, genres) {
      for (let genre in genres) {
        axios({
          method: 'post',
          url: `${DJANGO_URL}/movies/${genres[genre].id}/userprefergenre/`,
          headers: {
            Authorization: `Token ${context.state.Token}`
          },
        })
          .then((res) => {
            // console.log('성공')
            // console.log(res.data)
            context.commit('SAVE_USER_PREFER_GENRE',res.data)
          })
      }
    },
    saveUpdateProfile(context, payload) {
      axios({
        method: 'put',
        url: `${DJANGO_URL}/movies/${payload.id}/profile/`,
        data: {
          nickname: payload.nickname,
          mbti: payload.mbti
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        },
      })
        .then((res) => {
          console.log('수정 성공')
          context.commit('SAVE_UPDATE_PROFILE',res.data)
        })
    },
    deleteUserPreferGenre(context) {
      const genres = context.state.totalUserPreferGenre.filter((genre) => {
        return genre.user === context.state.userInfo.id
      })
      for(let genre of genres) {
        axios({
          method: 'delete',
          url: `${DJANGO_URL}/movies/userprefergenre/${genre.id}/`,
          headers: {
            Authorization: `Token ${context.state.Token}`
          },
        })
          .then(() => {
            console.log('삭제 성공')
            context.commit('DELETE_USER_PREFER_GENRE')
          })
          .catch(() => {
            console.log('삭제 실패')
          })
      }
    }
  },
  modules: {
  }
})
