<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        
        <!-- 홈으로 -->
        <router-link :to="{ name : 'movie' }" class="navbar-brand">극장</router-link><br>
        <!-- 햄버거 -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <!-- 영화버튼 -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                영화
              </a>
              <!-- 영화버튼 메뉴 -->
              <ul class="dropdown-menu">
                <li><router-link :to="{ name : 'genre'}" class="dropdown-item" >장르</router-link></li>
                <li><router-link :to="{ name : 'toprated'}" class="dropdown-item" >명작</router-link></li>
                <li><router-link :to="{ name : 'nowplaying'}" class="dropdown-item" >현재 상영</router-link></li>
                <li><router-link :to="{ name : 'upcomming'}" class="dropdown-item" >다가오는 상영</router-link></li>
              </ul>
            </li>

            <!-- 추천 버튼 -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                추천
              </a>
              <!-- 추천 메뉴 버튼 -->
              <ul class="dropdown-menu">
                <li><router-link :to="{ name : 'RecommandMbtiView' }" class="dropdown-item">엠비티아이</router-link></li>
                <li><router-link :to="{ name : 'RecommandGenreView' }" class="dropdown-item">취향</router-link></li>
                <li><router-link :to="{ name : 'hotmovie' }" class="dropdown-item">뜨거워</router-link></li>
              </ul>
            </li>

            <!-- 계정 버튼 -->
            <!-- 로그인 되지 않은 사용자 -->
            <li class="nav-item dropdown" v-if="!token">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                안녕하시오 나그네!
              </a>
              <ul class="dropdown-menu" >
                <li><router-link :to="{ name : 'signup' }" class="dropdown-item">장부 등록(회원가입)</router-link></li>
                <li><router-link :to="{ name : 'login' }" class="dropdown-item">로그인</router-link></li>
              </ul>
            </li>
            <!-- 로그인 된 사용자 -->
            <li class="nav-item dropdown"  v-else-if="token">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                안녕하시오 {{ userInfo?.username }}!
              </a>
              <ul class="dropdown-menu" >
                <li><a class="dropdown-item" @click.prevent="goToProfile" href="#">내 장부</a></li>
                <li><a class="dropdown-item" @click="logOut" href="#">내 흔적 지우기</a></li>
                <li><router-link :to="{ name : 'changepassword' }" class="dropdown-item">비밀번호 변경</router-link></li>
              </ul>
            </li>
          </ul>

          <!-- 영화검색 -->
          <form class="d-flex" role="search" >
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" data-bs-toggle="modal" data-bs-target="#exampleModal">
          </form>
        </div>
      </div>
    </nav>

    <!-- 영화 검색 Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" @click="closeSearching">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              <input 
                class="form-control me-5" 
                type="search" 
                placeholder="영화를 입력해주세요." 
                aria-label="Search" 
                id="titleName"
                @keyup="searchIng"
                style="width:400px;"
                autofocus
              >
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeSearching"></button>
          </div>
          <span class="modal-body">
            <div class="row row-cols-2 row-cols-lg-4 row-cols-xl-5 g-4">
            <!-- 검색 영화 정보 -->
            <SearchMovieItem
              v-for="movie in searchingMovie" :key="movie.id"
              :movie="movie"
            />
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>

  
</template>

<script>
import SearchMovieItem from '@/components/SearchMovieItem'

export default {
    name: 'NavBar',
    components: {
      SearchMovieItem
    },
    data() {
      return {
        titleName: null,
      }
    },
    methods:{
      logOut(){
        this.$store.dispatch('logOut')
      },
      searchIng() {
        const inputTag = document.querySelector('#titleName')
        this.titleName = inputTag.value
        this.$store.commit('SEARCH_ING',this.titleName)
      },
      closeSearching() {
        const inputTag = document.querySelector('#titleName')
        this.$store.commit('CLOSE_SEARCHING')
        this.titleName = null
        inputTag.value = null
      },
      goToProfile() {
        if (this.$store.state.userProfile === null) {
          alert('프로필을 생성해야합니다.!')
          this.$router.push({ name : 'ProfileCreateView' })
        } else {
          this.$router.push({ name : 'profile', params: { user_id : this.$store.state.userInfo.id }})
        }
      },
    },
    computed: {
      token() {
        return this.$store.state.Token
      },
      userInfo() {
        return this.$store.state.userInfo
      },
      searchingMovie() {
        return this.$store.state.searchingMovie
      }
    },
}
</script>

<style>

</style>




