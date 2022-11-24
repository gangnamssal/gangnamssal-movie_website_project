<template>
  <div id="app">
    <!-- 네비게이션 -->
    <nav-bar />
    <!-- 화면전환 효과&라우터 -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <!-- 푸터 -->
    <footer class="fixed-bottom">MADE BY 2022 SSAFY 태헌, 아진</footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import "animate.css";

export default {
  components: { NavBar },
  methods: {
    // DB에서 영화 가져오기
    getPopularMovie() {
      this.$store.dispatch("getPopularMovie");
    },
    // TMDB에서 인기 영화 가져오기
    APIPopularMovie() {
      this.$store.dispatch("APIPopularMovie");
    },
    // 장르 가져오기
    getGenres() {
      this.$store.dispatch("getGenres");
    },
    // 유저정보 가져오기
    getUserInfo() {
      this.$store.dispatch("getUserInfo");
    },
    // 유저가 선택 안 한 장르 정보 가져오기
    getPreferenceGenre() {
      this.$store.commit("GET_PREFERENCE_GENRE");
    },
    // 프로필정보 가져오기
    getProfile() {
      this.$store.dispatch("getProfile");
    },
    // 프로필정보 가져오기
    getProfileDetail() {
      this.$store.dispatch("getProfileDetail");
    },
    // 유저가 선택한 장르 가져오기
    getUserPreferGenre() {
      this.$store.dispatch("getUserPreferGenre");
    },
  },
  created() {
    this.getPopularMovie();
    this.getGenres();
    this.getUserInfo();
    this.APIPopularMovie();
    this.getPreferenceGenre();
    this.getProfile();
    this.getProfileDetail();
    this.getUserPreferGenre();
  },
};
</script>


<style>
/* 푸터 */
footer {
  text-align: center;
  color: gray;
  margin-top: 100px;
  padding: 5px;
  background-color: black;
}

/* 이미지 */
img:hover {
  display: inline-block;
  z-index: 1;
  scale: 1.05;
  transition: all 1s ease-in-out;
}

/* 바디 */
body {
  background-color: black;
  color: aliceblue;
}

/* 폰트 */
@font-face {
  font-family: "Tenada";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: "Tenada";
}

#first {
  position: fixed;
  width: 100%;
  height: 100%;
  animation-duration: 5s;
  animation-name: slidein;
  animation-fill-mode: forwards;
}

color {
  color: #000000;
  color: #412728;
  color: #7f4d3e;
  color: #b87c4c;
  color: #e2b659;
  color: #f9f871;
}

/* 계정 */
/* 계정 폼 아이콘 */
@import url(http://weloveiconfonts.com/api/?family=entypo);
@import url(https://fonts.googleapis.com/css?family=Roboto);
[class*="entypo-"]:before {
  font-family: "entypo", sans-serif;
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.auth {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  color: rgba(255, 255, 255, 0.8);
  margin-left: 12px;
}

.authForm {
  position: relative;
  margin: 50px auto;
  width: 380px;
  height: auto;
}

.authInput {
  padding: 16px;
  border-radius: 7px;
  border: 0px;
  background: rgba(255, 255, 255, 0.2);
  display: block;
  margin: 15px;
  width: 300px;
  color: white;
  font-size: 18px;
  height: 54px;
}

input:focus {
  outline-color: rgba(0, 0, 0, 0);
  background: rgba(255, 255, 255, 0.95);
  color: #e74c3c;
}

.authBtn {
  float: right;
  height: 121px;
  width: 50px;
  border: 0px;
  background: #e74c3c;
  border-radius: 7px;
  padding: 10px;
  color: white;
  font-size: 22px;
  margin-top: 8px;
}

.inputUserIcon {
  position: absolute;
  top: 68px;
  right: 80px;
  color: white;
}

.inputPassIcon {
  position: absolute;
  top: 68px;
  right: 80px;
  color: white;
}
.inputPassIcon2 {
  position: absolute;
  top: 136px;
  right: 80px;
  color: white;
}
.inputPassIcon3 {
  position: absolute;
  top: 208px;
  right: 80px;
  color: white;
}

input::-webkit-input-placeholder {
  color: white;
}

input:focus::-webkit-input-placeholder {
  color: #e74c3c;
}

/* vue 애니메이션 효과 */
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

/* 링크 페이지 style */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.movieLink {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #050801;
  font-family: "Tenada";
}
#movieLink {
  position: relative;
  display: inline-block;
  padding: 25px 30px;
  margin: 40px 0;
  color: #03e9f4;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  overflow: hidden;
  margin-right: 50px;
  width: 240px;
  text-align: center;
}
#movieLink:hover {
  background: #03e9f4;
  color: #050801;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 200px #03e9f4;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}
#movieLink:nth-child(1) {
  filter: hue-rotate(270deg);
}
#movieLink:nth-child(2) {
  filter: hue-rotate(110deg);
}
#movieLink:nth-child(3) {
  filter: hue-rotate(190deg);
}
#movieLink span {
  position: absolute;
  display: block;
}
#movieLink span:nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: animate1 1s linear infinite;
}
@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
#movieLink span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: animate2 1s linear infinite;
  animation-delay: 0.25s;
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
#movieLink span:nth-child(3) {
  bottom: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: animate3 1s linear infinite;
  animation-delay: 0.5s;
}
@keyframes animate3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

#movieLink span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: animate4 1s linear infinite;
  animation-delay: 0.75s;
}
@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
