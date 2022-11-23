<template>
  <div id="profile">
    <div class="container">
      <div  class="row row-cols-2">
        <div id="profileText" class="col">
          <h1>프로필</h1>
          <!-- <button @click="goToWrite">작성하러 가기</button> -->
          <button >수정하러 가기</button>
          <p>닉네임 : {{ profile?.nickname }}</p>
          <p>mbti : {{ profile?.mbti }}</p>
          <p>선호 장르 : </p>
          <p v-for="genre in userPreferGenre" :key="genre.id">
            {{ genre }}
          </p>
        </div>
    
        <div id="profiledata" class="col">
          <p>내가 좋아한 영화 : </p>
          <span v-for="movie in favoriteMovie" :key="movie.id">{{ movie.title }} <br></span>
          <hr>
          <p>내가 쓴 리뷰 : </p>
          <span v-for="review in myReviewList" :key="review.id">{{ review.title }}</span>
        </div>
      </div>
      </div>

  </div>
</template>

<script>
export default {
    name: 'ProfileView',
    data() {
      return {
        favoriteMovie: null,
        myReviewList: null,
      }
    },
    methods: {
      goToWrite() {
        this.$router.push({ name : 'ProfileCreateView' })
      },
      getProfile() {
        this.$store.dispatch('getProfileDetail')
      },
      getPreferGenre() {
        this.$store.commit('GET_PREFER_GENRE')
      },
      myFavoriteMovie() {
        const findMovie = []
        for (let movie of this.$store.state.userInfo.movielike_set) {
          findMovie.push(this.$store.state.popularMovie.find((movies) => {
            return movie.movieLike === movies.id
          }))
        }
        this.favoriteMovie = findMovie
      },
      getReviewList() {
        this.myReviewList = this.$store.state.userInfo.review_set
      }
    },
    computed: {
      profile() {
        return this.$store.state.userProfile
      },
      userPreferGenre() {
        return this.$store.state.userPreferGenre
      }
      
    },
    created() { 
      this.getProfile()
      this.getPreferGenre()
      this.myFavoriteMovie()
      this.getReviewList()
    },
}
</script>

<style>
#profile{
  /* background-size:cover ; */
  /* background-position: center; */
  height: 100vh;
  width: 100%;
  /* height: 100%; */
  /* margin: 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  content: "";
}

#profile::after{
  background: url('../assets/back.jpg');
  background-size:cover ;
  background-position: center;
  opacity: 0.5;
  height: 100vh;
  width: 100%;
  /* height: 100%; */
  /* margin: 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
  content: "";
}

#profileText{
  display: flex;
  flex-direction: column;
  /* text-align: center; */
  align-items: center;
  margin-top: 100px;
  border: solid 2px ;
  padding: 1rem;  
  font-size: larger;
}
</style>