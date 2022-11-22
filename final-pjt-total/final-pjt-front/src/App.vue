<template>
  <div id="app">
    <img id="first" src="https://images.unsplash.com/photo-1660221669321-b29fbfbb0b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="">
    <div id="intro-back"></div>
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import 'animate.css'

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
      },
      getProfile() {
        this.$store.dispatch('getProfile')
      },
      getProfileDetail() {
        this.$store.dispatch('getProfileDetail')
      }
    },
    created() {
      // this.getTotalMovie()
      this.getPopularMovie()
      this.getGenres()
      this.getUserInfo()
      this.APIPopularMovie()
      this.getPreferenceGenre()
      this.getProfile()
      this.getProfileDetail()
    }
    
}
</script>


<style>


img:hover{
  display: inline-block;
  z-index: 1 ;
  scale: 1.05 ;
  transition: all 1s ease-in-out;
}

.like{
  border: none;
  background: none;
}

body{
  background-color: black;
  color: aliceblue;
}
@font-face {
    font-family: 'ChosunCentennial';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/ChosunCentennial.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
#app {
  font-family: 'ChosunCentennial';
}

/* #intro-back{
  background-image: url('./assets/intro-back.jpg');
  background-size:cover;
  height: 100vh;
  display: inline-block;
  animation: zoomIn; 
  animation: fadeOut;
  animation-duration: 2s;
} */
/* #dd{
  display: inline-block;
  animation: zoomIn; 
  /* animate__zoomIn */
  /* animation-duration: 2s;
} */ 

#first {
  position: fixed;
  width: 100%;
  height: 100%;
  animation-duration: 3s;
  animation-name: slidein;
  animation-fill-mode: forwards;
}

@keyframes slidein {
  from {
  }
  25% {
    scale: 2;
    opacity: 1;
  }
  99% {
    scale: 2;
    opacity: 0;
  }
  to {
    scale: 2;
    opacity: 0;
    visibility: hidden;
  }
}

</style>
