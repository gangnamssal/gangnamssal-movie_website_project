<template>
  <div @click="getDetail(movie?.id)">
    <img :src="posterUrl" alt=""><br>
    <span>{{ movie?.title }}</span>
    <hr>
  </div>
</template>

<script>
export default {    
    name: 'HomeItem',
    props: {
        movie: Object
    },
    computed: {
        posterUrl() {
            const url = 'https://www.themoviedb.org/t/p/original' + this.movie.poster_path
            return url
        }
    },
    methods: {
      getDetail(movie_id) {
        this.$router.push({ name: 'detail', params: { movie_id } })
      }
    }
}
</script>

<style>

</style>