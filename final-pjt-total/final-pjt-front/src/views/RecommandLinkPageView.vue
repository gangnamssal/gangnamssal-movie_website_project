<template>
    <div class="movieLink">
      <a id="movieLink" @click.prevent="mbtiNeedProfile">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          MBTI
      </a>
      <a id="movieLink" @click.prevent="genreNeedProfile">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          취향
      </a>
      <router-link :to="{ name : 'hotmovie'}" id="movieLink">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          뜨거워
      </router-link>

    </div>
</template>
  
<script>
export default {
    name:'RecommandLinkPageView',
    methods: {
    mbtiNeedProfile() {
        if (this.$store.state.Token === null) {
            alert('로그인이 필요합니다!')
            this.$router.push({ name : 'login'})
        } else {
            if (this.$store.state.userProfile === null) {
                alert('프로필을 생성해주세요!')
                this.$router.push({ name: 'ProfileCreateView'})
            } else {
                if (this.$store.state.userProfile.mbti === '0') {
                    alert('프로필을 수정해주세요!')
                    this.$router.push({ name : 'ProfileUpdateView'})
                } else {
                    this.$router.push({ name : 'RecommandMbtiView'})
                }
            }
        }
    },
    genreNeedProfile() {
        if (this.$store.state.Token === null) {
            alert('로그인이 필요합니다!')
            this.$router.push({ name : 'login'})
        } else {
            if (this.$store.state.userProfile === null) {
                alert('프로필을 생성해주세요!')
                this.$router.push({ name: 'ProfileCreateView'})
            } else {
                if (this.$store.state.userPreferGenre.length === 0) {
                    alert('프로필을 수정해주세요!')
                    this.$router.push({ name : 'ProfileUpdateView'})
                } else {
                    this.$router.push({ name : 'RecommandMbtiView'})
                }
            }
        }
    },
    }
}
</script>

<style>
</style>