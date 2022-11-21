<template>
  <div id="app">

    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'


export default {
  components: { NavBar },
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

.like{
  border: none;
  background: none;
}

body{
  background-color: black;
  color: aliceblue;
}
</style>
