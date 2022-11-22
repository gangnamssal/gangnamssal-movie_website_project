<template>
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 mt-3">
    <HomeItem
      v-for="movie in APIpopularMovie" :key="movie.id"
      :movie="movie"
    />
  </div>

</template>

<script>
import HomeItem from '@/components/HomeItem'

export default {
    name: 'HomeView',
    components: {
        HomeItem
    },
    methods: {
      // getPopularMovie() {
      //   this.$store.dispatch('getPopularMovie')
      // }
      getUserInfo() {
        this.$store.dispatch('getUserInfo')
      },
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