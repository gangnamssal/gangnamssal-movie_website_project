<template>
  <span @click="getDetail(movie?.id)" data-bs-dismiss="modal">
    <img 
        :src="`https://www.themoviedb.org/t/p/original${movie?.poster_path}`" 
        :alt="movie?.title"
        style="height:250px;"
    ><br>
  </span>
</template>

<script>
export default {
    name: 'SearchMovieItem',
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