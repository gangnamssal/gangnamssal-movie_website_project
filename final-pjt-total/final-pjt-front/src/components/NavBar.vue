<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-black">
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
            <li class="nav-item">
              <router-link :to="{ name : 'MovieLinkPageView'}" class="nav-link">영화</router-link>
            </li>

            <!-- 추천 버튼 -->
            <li class="nav-item">
              <router-link :to="{ name : 'RecommandLinkPageView'}" class="nav-link">추천</router-link>
            </li>

            <!-- 계정 버튼 -->
            <!-- 로그인 되지 않은 사용자 -->
              <li class="nav-item"  v-if="!token">
                <router-link :to="{ name : 'AuthLinkPageView'}" class="nav-link">안녕하시오 나그네!</router-link>
              </li>


            <!-- 로그인 된 사용자 -->
            <li class="nav-item"  v-else-if="token">
                <router-link :to="{ name : 'AuthLinkPageView'}" class="nav-link">안녕하시오 {{ userInfo?.username }}!</router-link>
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
<<<<<<< HEAD
      goToProfile() {
        if (this.$store.state.userProfile === null) {
          alert('프로필을 생성해야합니다.!')
          this.$router.push({ name : 'ProfileCreateView' })
        } else {
          this.$router.push({ name : 'profile', params: { user_id : this.$store.state.userInfo.id }})
        }
      },
=======
>>>>>>> 0ee49ef697a5033e888c6998bdda0da5356dab69
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




