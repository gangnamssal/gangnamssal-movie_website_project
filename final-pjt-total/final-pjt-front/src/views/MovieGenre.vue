<template>
  <div>
    <h1>장르</h1>
    <router-link :to="{ name : 'movie'}">홈으로</router-link><br>
    <GenreButton
      v-for="genre in genres" :key="genre.id"
      :genre="genre"
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