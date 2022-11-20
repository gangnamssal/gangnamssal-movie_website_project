<template>
  <div>
    <h1>네브바</h1>

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
  




  <nav class="navbar">
      <div class="container-fluid">
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" data-bs-toggle="modal" data-bs-target="#exampleModal">
        </form>
      </div>
  </nav>

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