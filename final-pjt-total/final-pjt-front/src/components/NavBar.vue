<template>
  <div>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link :to="{ name : 'movie' }" class="navbar-brand">극장</router-link><br>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            영화
          </a>
          <ul class="dropdown-menu">
            <li><router-link :to="{ name : 'genre'}" class="dropdown-item" >장르</router-link></li>
            <li><router-link :to="{ name : 'toprated'}" class="dropdown-item" >명작</router-link></li>
            <li><router-link :to="{ name : 'nowplaying'}" class="dropdown-item" >현재 상영</router-link></li>
            <li><router-link :to="{ name : 'upcomming'}" class="dropdown-item" >다가오는 상영</router-link></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            추천
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">엠비티아이</a></li>
            <li><router-link :to="{ name : 'RecommandGenreView' }" class="dropdown-item">취향</router-link></li>
            <li><router-link :to="{ name : 'hotmovie' }" class="dropdown-item">뜨거워</router-link></li>
            <!-- <li><a class="dropdown-item" href="#">Another Algo</a></li> -->
          </ul>
        </li>


        <li class="nav-item dropdown" v-if="!token">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            안녕하시오 나그네!
          </a>
          <ul class="dropdown-menu" >
            <li><router-link :to="{ name : 'signup' }" class="dropdown-item">장부 등록(회원가입)</router-link></li>
            <li><router-link :to="{ name : 'login' }" class="dropdown-item">로그인</router-link></li>
          </ul>
        </li>

        <li class="nav-item dropdown"  v-else-if="token">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            안녕하시오 {{ userInfo?.username }}!
          </a>
          <ul class="dropdown-menu" >
            <!-- <li><router-link :to="{ name : 'profile' }" class="dropdown-item">Profile</router-link></li> -->
            <li><a class="dropdown-item" @click.prevent="goToProfile" href="#">내 장부</a></li>
            <li><a class="dropdown-item" @click="logOut" href="#">내 흔적 지우기</a></li>
            <li><router-link :to="{ name : 'changepassword' }" class="dropdown-item">비밀번호 변경</router-link></li>
            <!-- <li><a class="dropdown-item" href="#">Signout</a></li> -->
          </ul>
        </li>

      </ul>
      <form class="d-flex" role="search" >
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </form>
    </div>

    </div>
  </nav>
    <!-- <h1>네브바</h1>

    <span v-if="!token">
      <router-link :to="{ name : 'login' }">로그인</router-link><br>
      <router-link :to="{ name : 'signup' }">회원가입</router-link><br>
    </span>
    
    <span v-else-if="token">
      <span>Hello! {{ userInfo?.username }}</span>
      <br>
      <router-link :to="{ name : 'changepassword' }">비밀번호변경</router-link><br>
      <button @click="logOut">로그아웃</button><br>
    </span>
    <br>
    
    <router-link :to="{ name : 'genre'}">장르별 영화</router-link><br>
    <router-link :to="{ name : 'toprated' }">명작</router-link><br>
    <router-link :to="{ name : 'upcomming' }">개봉 예정</router-link><br>
    <router-link :to="{ name : 'nowplaying' }">현재 상영중</router-link><br>
   -->

  <!-- <nav class="navbar">
      <div class="container-fluid">
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" data-bs-toggle="modal" data-bs-target="#exampleModal">
        </form>
      </div>
  </nav> -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" @click="closeSearching">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">
          <input 
            class="form-control me-5" 
            type="search" 
            placeholder="Search" 
            aria-label="Search" 
            id="titleName"
            @keyup="searchIng"
            style="width:400px;"
          >
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeSearching"></button>
      </div>
      <span class="modal-body">
        <div class="row row-cols-2 row-cols-lg-4 row-cols-xl-5 g-4">
        
        <SearchMovieItem
          v-for="movie in searchingMovie" :key="movie.id"
          :movie="movie"
        />
        </div>
      </span>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeSearching">Close</button>
      </div> -->
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
          this.$router.push({ name : 'profile', params: { user_id : this.$store.state.userInfo.pk }})
        }
      }
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
    }
}
</script>

<style>

</style>




