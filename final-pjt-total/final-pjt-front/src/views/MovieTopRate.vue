<template>
  <div>
    <h1>탑레이트</h1>
    <MovieTopRatedItem
      v-for="movie in topRatedMovie" :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import MovieTopRatedItem from '@/components/MovieTopRatedItem'
export default {
  name: 'MovieTopRate',
  components: { 
    MovieTopRatedItem 
    },
    methods: {
      getTopRatedMovie(){
        this.$store.dispatch('getTopRatedMovie')
      }
    },
    computed: {
      topRatedMovie() {
        return this.$store.state.topRatedMovie
      }
    },
    created() {
      this.getTopRatedMovie()
    }
}
</script>

<style>

</style>