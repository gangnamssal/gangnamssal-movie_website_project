<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
    // name: 'HomeView',
    methods: {
      // getTotalMovie() {
      //   this.$store.dispatch('getTotalMovie')
      // },
      getPopularMovie() {
        this.$store.dispatch('getPopularMovie')
      },
      APIPopularMovie() {
        this.$store.dispatch('APIPopularMovie')
      },
      getGenres() {
        this.$store.dispatch('getGenres')
      },
      getUserInfo() {
        this.$store.dispatch('getUserInfo')
      },
      getPreferenceGenre() {
        this.$store.commit('GET_PREFERENCE_GENRE')
      }
    },
    created() {
      // this.getTotalMovie()
      this.getPopularMovie()
      this.getGenres()
      this.getUserInfo()
      this.APIPopularMovie()
      this.getPreferenceGenre()
    }
    
}
</script>


<style>
img{
    width: 300px;
    height: 400px;
}
</style>
