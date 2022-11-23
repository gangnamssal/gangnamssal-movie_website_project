<template>
  <div id="app">

    <nav-bar/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>

    <div class="container">
      <footer class="py-3 my-4 ">
      <p class="text-center text-muted">MADE BY 2022 SSAFY 태헌, 아진</p>
      </footer>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import 'animate.css'

export default {
  components: { NavBar },
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
      },
      getUserPreferGenre() {
        this.$store.dispatch('getUserPreferGenre')
      }
    },
    created() {
      this.getPopularMovie()
      this.getGenres()
      this.getUserInfo()
      this.APIPopularMovie()
      this.getPreferenceGenre()
      this.getProfile()
      this.getProfileDetail()
      this.getUserPreferGenre()
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
    font-family: 'Tenada';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
#app {
  font-family: 'Tenada';

}

#first {
  position: fixed;
  width: 100%;
  height: 100%;
  animation-duration: 5s;
  animation-name: slidein;
  animation-fill-mode: forwards;
}

color{
  color: #000000;
  color: #412728;
  color: #7F4D3E;
  color: #B87C4C;
  color: #E2B659;
  color: #F9F871;
}

@import url(http://weloveiconfonts.com/api/?family=entypo);
@import url(https://fonts.googleapis.com/css?family=Roboto);
[class*="entypo-"]:before {
  font-family: 'entypo', sans-serif;
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box; 
}

.auth{
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

h2 {
  color:rgba(255,255,255,.8);
  margin-left:12px;
}


.authForm {
  position:relative;
  margin: 50px auto;
  width: 380px;
  height: auto;
}

.authInput {
  padding: 16px;
  border-radius:7px;
  border:0px;
  background: rgba(255,255,255,.2);
  display: block;
  margin: 15px;
  width: 300px;  
  color:white;
  font-size:18px;
  height: 54px;
}

input:focus {
  outline-color: rgba(0,0,0,0);
  background: rgba(255,255,255,.95);
  color: #e74c3c;
}

.authBtn {
  float:right;
  height: 121px;
  width: 50px;
  border: 0px;
  background: #e74c3c;
  border-radius:7px;
  padding: 10px;
  color:white;
  font-size:22px;
  margin-top: 8px;
}

.inputUserIcon {
  position:absolute;
  top:68px;
  right: 80px;
  color:white;
}

.inputPassIcon {
  position:absolute;
  top:68px;
  right: 80px;
  color:white;
}
.inputPassIcon2 {
  position:absolute;
  top:136px;
  right: 80px;
  color:white;
}
.inputPassIcon3 {
  position:absolute;
  top:208px;
  right: 80px;
  color:white;
}

input::-webkit-input-placeholder {
  color: white;
}

input:focus::-webkit-input-placeholder {
  color: #e74c3c;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
