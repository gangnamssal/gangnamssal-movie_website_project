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
      }
    },
    computed:{
      popularMovie(){
        return this.$store.state.popularMovie
      }
    },
    created() {
      this.getPopularMovie()
    }
    
}
</script>

<style>

</style>