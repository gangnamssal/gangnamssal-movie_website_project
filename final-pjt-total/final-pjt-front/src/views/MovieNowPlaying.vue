<template>
  <div>
    <h1>나우플레잉</h1>
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
      <NowPlayingMovieItem
        v-for="movie in nowPlayingMovie" :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>

</template>

<script>
import NowPlayingMovieItem from '../components/NowPlayingMovieItem.vue'
export default {
  name: 'MovieNowPlaying',
  components: { NowPlayingMovieItem },
    methods: {
      getNowPlayingMovie(){
        this.$store.dispatch('getNowPlayingMovie')
      }
    },
    created() {
      this.getNowPlayingMovie()
    },
    computed: {
      nowPlayingMovie() {
        return this.$store.state.nowPlayingMovie
      }
    }
}
</script>

<style>

</style>