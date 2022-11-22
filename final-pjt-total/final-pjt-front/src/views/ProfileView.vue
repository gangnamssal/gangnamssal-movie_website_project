<template>
  <div id="profile">
    <div class="container">
      <div  class="row row-cols-2">
        <div id="profileText" class="col">
          <h1>프로필</h1>
          <!-- <button @click="goToWrite">작성하러 가기</button> -->
          <button>수정하러 가기</button>
          <p>닉네임 : {{ profile?.nickname }}</p>
          <p>mbti : {{ profile?.mbti }}</p>
          <p>선호 장르 : {{ profile?.prefer_genre }}</p>
        </div>
    
        <div id="profiledata" class="col">
          <p>내가 좋아한 영화</p>
          <p>내가 쓴 리뷰</p>
        </div>
      </div>
      </div>

  </div>
</template>

<script>
export default {
    name: 'ProfileView',
    methods: {
      goToWrite() {
        this.$router.push({ name : 'ProfileCreateView' })
      },
      getProfile() {
        this.$store.dispatch('getProfileDetail')
      }
    },
    computed: {
      profile() {
        return this.$store.state.userProfile
      }
    },
    created() { 
      this.getProfile()
    }
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