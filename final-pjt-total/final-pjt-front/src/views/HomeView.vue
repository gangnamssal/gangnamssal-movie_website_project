<template>
  <div>
    <NavBar/>
    <hr>
    <HomeItem
      v-for="movie in popularMovie" :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import HomeItem from '@/components/HomeItem'

export default {
    name: 'HomeView',
    components: {
        NavBar,
        HomeItem
    },
    methods: {
      getPopularMovie() {
        this.$store.dispatch('getPopularMovie')
      },
      getGenres() {
        this.$store.dispatch('getGenres')
      },
      getUserInfo() {
        this.$store.dispatch('getUserInfo')
      }
    },
    computed:{
      popularMovie(){
        return this.$store.state.popularMovie
      },
    },
    created() {
      this.getPopularMovie()
      this.getGenres()
      this.getUserInfo()
    }
    
}
</script>

<style>

</style>