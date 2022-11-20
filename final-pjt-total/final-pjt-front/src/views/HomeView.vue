<template>
  <div>
    <NavBar/>
    <hr>
    <HomeItem
      v-for="movie in APIpopularMovie" :key="movie.id"
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
      // getPopularMovie() {
      //   this.$store.dispatch('getPopularMovie')
      // }
      getUserInfo() {
        this.$store.dispatch('getUserInfo')
      }
    },
    computed:{
      APIpopularMovie(){
        return this.$store.state.APIpopularMovie
      },
    },
    created(){
      // this.getPopularMovie()
      this.getUserInfo()
    }
    
}
</script>

<style>

</style>