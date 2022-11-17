<template>
  <div>
    <img :src="posterUrl" alt=""><br>
    <span>{{ movie.title }}</span>
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
    }
}
</script>

<style>
img{
    width: 300px;
    height: 400px;
}
</style>