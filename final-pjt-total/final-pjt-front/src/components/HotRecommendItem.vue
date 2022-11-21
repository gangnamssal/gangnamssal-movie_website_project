<template>
  <div>
    HotRecommendItem

    <div @click="getDetail(movie?.id)">
      <div class="col">
        <div class="h-100">
          <img :src="posterUrl" class="card-img-top" alt="...">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    name:'HotRecommendItem',
    props:{
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