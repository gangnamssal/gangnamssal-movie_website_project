<template>
  <div>
    <h1>프로필</h1>
    <!-- <button @click="goToWrite">작성하러 가기</button> -->
    <button>수정하러 가기</button>
    <p>닉네임 : {{ profile?.nickname }}</p>
    <p>mbti : {{ profile?.mbti }}</p>
    <p>선호 장르 : {{ profile?.prefer_genre }}</p>
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

</style>