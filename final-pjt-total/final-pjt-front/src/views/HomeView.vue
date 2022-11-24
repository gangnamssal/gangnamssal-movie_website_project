<template>
<!-- 환영 페이지 -->
<div>
  <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="../assets/main1.jpg" class="d-block" width="100%" height="30%" alt="h1">
            <div class="container">
                <div class="carousel-caption text-start">
                    <h1>Enjoy with us</h1>
                    <p>Share your movie and message with friends and family in a simple, fun way.</p>
                    <p><router-link :to="{ name : 'signup' }" class="btn btn-lg btn-danger" style="color:black">Sign up today</router-link></p>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <img src="../assets/main2.jpg" class="d-block" width="100%" height="50%" alt="h1">
            <div class="container">
                <div class="carousel-caption">
                    <h1>You can create your world!</h1>
                    <p>You can pick as much as you want.</p>
                    <p><router-link :to="{ name : 'hotmovie' }" class="btn btn-lg btn-warning">Recomand</router-link></p>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <img src="../assets/main3.jpg" class="d-block" width="100%" height="50%" alt="h1">
            <div class="container">
                <div class="carousel-caption text-end">
                    <h1>What's your favorite?</h1>
                    <p>There's a great big world of new stories waiting to be discovered!</p>
                    <p><router-link :to="{ name : 'genre'}" class="btn btn-lg btn-primary" style="color:black" >Find movie</router-link></p>
                </div>
            </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
  </div>
  <h1 class="box-office">Box Office 순위</h1>
  <!-- 인기 영화 리스트 -->
  <div class="mt-5 pt-5">
    <carousel-3d :height="1000" :width="700" >
        <slide v-for="(movie, i) in APIpopularMovie" :index="i" :key="movie.id" style="background:black; text-align:center">
            <h1>{{ i+1 }} 위</h1>
            <HomeItem :movie="movie"/>
        </slide>
    </carousel-3d>
  </div>
</div>
</template>

<script>
// This project is licensed under the MIT License - see the LICENSE.md file for details.
import HomeItem from '@/components/HomeItem'
import { Carousel3d, Slide } from 'vue-carousel-3d';
export default {
    name: 'HomeView',
    components: {
    Carousel3d,
    Slide,
    HomeItem
    },
    methods: {
      getUserInfo() {
        this.$store.dispatch('getUserInfo')
      },
      getPreferGenre() {
        this.$store.commit('GET_PREFER_GENRE')
      }
    },
    computed:{
      APIpopularMovie(){
        return this.$store.state.APIpopularMovie
      },
    },
    created(){
      this.getUserInfo()
      this.getPreferGenre()
    }
    
}
</script>

<style>
.box-office{
  text-align: center;
  padding-top: 100px;
  color: red;
}
</style>