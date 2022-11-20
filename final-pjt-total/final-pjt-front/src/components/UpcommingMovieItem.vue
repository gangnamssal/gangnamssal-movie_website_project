<template>
  <div @click="getDetail(movie?.id)"> 
    <img :src="`https://www.themoviedb.org/t/p/original${movie?.poster_path}`" alt=""><br>
    <span>{{ movie?.title }} - </span>
    <span>{{ movie?.release_date }}</span>
  </div>
</template>

<script>
export default {
    name: 'UpcommingMovieItem',
    props: {
        movie: Object
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