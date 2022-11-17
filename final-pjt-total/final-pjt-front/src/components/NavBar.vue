<template>
  <div>
    <h1>네브바</h1>
    <h2></h2>
    <router-link :to="{ name : 'genre'}">장르별 영화</router-link><br>
    <router-link :to="{ name : 'toprated' }">명작</router-link><br>
    <router-link :to="{ name : 'upcomming' }">개봉 예정</router-link><br>
    <router-link :to="{ name : 'nowplaying' }">현재 상영중</router-link><br>
    <span v-if="!token">
      <router-link :to="{ name : 'login' }">로그인</router-link><br>
      <router-link :to="{ name : 'signup' }">회원가입</router-link><br>
    </span>
    <span v-else-if="token">
      <span>Hello! {{ userInfo?.username }}</span>
      <br>
      <router-link :to="{ name : 'changepassword' }">비밀번호변경</router-link><br>
      <button @click="logOut">로그아웃</button><br>
    </span>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    methods:{
      logOut(){
        this.$store.dispatch('logOut')
      }
    },
    computed: {
      token() {
        return this.$store.state.Token
      },
      userInfo() {
        return this.$store.state.userInfo
      }
    }
}
</script>

<style>

</style>