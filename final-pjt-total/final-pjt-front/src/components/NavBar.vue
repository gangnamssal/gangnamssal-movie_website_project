<template>
  <div>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link :to="{ name : 'movie' }" class="navbar-brand">Home</router-link><br>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Movie
          </a>
          <ul class="dropdown-menu">
            <li><router-link :to="{ name : 'genre'}" class="dropdown-item" >Genre</router-link></li>
            <li><router-link :to="{ name : 'toprated'}" class="dropdown-item" >Top Rated</router-link></li>
            <li><router-link :to="{ name : 'upcomming'}" class="dropdown-item" >Now Playing</router-link></li>
            <li><router-link :to="{ name : 'nowplaying'}" class="dropdown-item" >Upcomming</router-link></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Recomandation
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">MBTI</a></li>
            <li><a class="dropdown-item" href="#">Taste</a></li>
            <li><a class="dropdown-item" href="#">Another Algo</a></li>
            <li><a class="dropdown-item" href="#">Another Algo</a></li>
          </ul>
        </li>


        <li class="nav-item dropdown" v-if="!token">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Hello! Strager
          </a>
          <ul class="dropdown-menu" >
            <li><router-link :to="{ name : 'signup' }" class="dropdown-item">Signup</router-link></li>
            <li><router-link :to="{ name : 'login' }" class="dropdown-item">Login</router-link></li>
          </ul>
        </li>

        <li class="nav-item dropdown"  v-else-if="token">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Hello! {{ userInfo?.username }}
          </a>
          <ul class="dropdown-menu" >
            <li><router-link :to="{ name : 'profile' }" class="dropdown-item">Profile</router-link></li>
            <li><a class="dropdown-item" @click="logOut" href="#">Logout</a></li>
            <li><router-link :to="{ name : 'changepassword' }" class="dropdown-item">Changepassword</router-link></li>
            <li><a class="dropdown-item" href="#">Signout</a></li>
          </ul>
        </li>

      </ul>
      <form class="d-flex" role="search">
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
  <div class="modal-dialog">
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
          >
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeSearching"></button>
      </div>
      <span class="modal-body">
        <SearchMovieItem
          v-for="movie in searchingMovie" :key="movie.id"
          :movie="movie"
        />
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




