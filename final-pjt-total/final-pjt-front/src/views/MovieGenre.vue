<template>
  <div>
    <h1>장르</h1>
    <router-link :to="{ name : 'movie'}">홈으로</router-link>


  <div class="btn-group" role="group">
      <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="sortButton">
        
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" @click="nameSort">이름순으로</a></li>
        <li><a class="dropdown-item" @click="popularitySort">인기순으로</a></li>
        <li><a class="dropdown-item" @click="releasedSort">개봉일순으로</a></li>
      </ul>
  </div>



    <br>
    <GenreButton
      v-for="genre in genres" :key="genre.id"
      :genre="genre"
      @genreButtonClick="genreButtonClick"
    />


    <br>
    <br>
    <span v-for="movie in genrepopularMovie" :key="movie.id" @click="getDetail(movie?.id)">
      <img :src="`https://www.themoviedb.org/t/p/original${movie.poster_path}`" alt=""><br>
      {{ movie?.title }}
      <br>
    </span>
  </div>
</template>

<script>
import GenreButton from '@/components/GenreButton'

export default {
  
  name: 'MovieGenre',
  components: {
     GenreButton 
  },
  methods: {
    getDetail(movie_id) {
        this.$router.push({ name: 'detail', params: { movie_id } })
      },
      nameSort() {
        const buttonTag = document.querySelector('#sortButton')
        this.$store.commit('NAME_SORT')
        buttonTag.innerText = '이름순으로'
      },
      popularitySort() {
        const buttonTag = document.querySelector('#sortButton')
        this.$store.commit('POPULARITY_SORT')
        buttonTag.innerText = '인기순으로'
      },
      releasedSort() {
        const buttonTag = document.querySelector('#sortButton')
        this.$store.commit('RELEASED_SORT')
        buttonTag.innerText = '최신 개봉일순으로'
      },
      genreButtonClick() {
        const buttonTag = document.querySelector('#sortButton')
        buttonTag.innerText = null
      }
  },
  computed: {
    genres() {
      return this.$store.state.genres
    },
    genrepopularMovie() {
        return this.$store.state.genrepopularMovie
    },
  }
}
</script>

<style>

</style>