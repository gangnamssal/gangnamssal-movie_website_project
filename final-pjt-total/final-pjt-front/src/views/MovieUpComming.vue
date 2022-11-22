<template>
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
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