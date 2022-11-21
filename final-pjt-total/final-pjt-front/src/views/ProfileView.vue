<template>
  <div>
    <h1>프로필</h1>
    <button @click="goToWrite">작성하러 가기</button>
    <button>수정하러 가기</button>
    <p>닉네임 : {{ getProfile[0].nickname }}</p>
    <p>mbti : {{ getProfile[0].mbti }}</p>
    <p>선호 장르 : {{ getProfile[0].prefer_genre }}</p>
  </div>
</template>

<script>
export default {
    name: 'ProfileView',
    methods: {
      goToWrite() {
        this.$router.push({ name : 'ProfileCreateView' })
      }
    },
    computed: {
      getProfile() {
        return this.$store.getters.getProfile
      }
    },
    created() {
      this.getProfile()
    }
}
</script>

<style>

</style>