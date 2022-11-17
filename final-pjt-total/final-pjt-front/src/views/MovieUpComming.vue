<template>
  <div>
    <h1>업커밍</h1>
    <UpcommingMovieItem
      v-for="movie in upcommingMovie" :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import UpcommingMovieItem from '../components/UpcommingMovieItem'


export default {
  name: 'MovieUpComming',
  components: { 
    UpcommingMovieItem
    },
    methods: {
      getUpCommingMovie(){
        this.$store.dispatch('getUpCommingMovie')
      }
    },
    created() {
      this.getUpCommingMovie()
    },
    computed: {
      upcommingMovie() {
        return this.$store.state.upcommingMovie
      }
    }
}
</script>

<style>

</style>