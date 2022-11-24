<template>
  <div class="movieLink">
    <!-- MBTI 추천 페이지 링크 -->
    <a id="movieLink" @click.prevent="mbtiNeedProfile">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      MBTI
    </a>
    <!-- 취향 추천 페이지 링크 -->
    <a id="movieLink" @click.prevent="genreNeedProfile">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      취향
    </a>
    <!-- 좋아요 많이 받은 영화 페이지 링크 -->
    <router-link :to="{ name: 'hotmovie' }" id="movieLink">
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
  name: "RecommandLinkPageView",
  methods: {
    // 로그인한 사용자가 프로필 정보에 mbti정보를 입력해야만 추천 페이지로 보냄
    mbtiNeedProfile() {
      if (this.$store.state.Token === null) {
        alert("로그인이 필요합니다!");
        this.$router.push({ name: "login" });
      } else {
        if (this.$store.state.userProfile === null) {
          alert("프로필을 생성해주세요!");
          this.$router.push({ name: "ProfileCreateView" });
        } else {
          if (this.$store.state.userProfile.mbti === "0") {
            alert("프로필을 수정해주세요!");
            this.$router.push({ name: "ProfileUpdateView" });
          } else {
            this.$router.push({ name: "RecommandMbtiView" });
          }
        }
      }
    },
    // 로그인한 사용자가 프로필 정보에 취향 정보를 입력해야만 추천 페이지로 보냄
    genreNeedProfile() {
      if (this.$store.state.Token === null) {
        alert("로그인이 필요합니다!");
        this.$router.push({ name: "login" });
      } else {
        if (this.$store.state.userProfile === null) {
          alert("프로필을 생성해주세요!");
          this.$router.push({ name: "ProfileCreateView" });
        } else {
          if (this.$store.state.userPreferGenre.length === 0) {
            alert("프로필을 수정해주세요!");
            this.$router.push({ name: "ProfileUpdateView" });
          } else {
            this.$router.push({ name: "RecommandMbtiView" });
          }
        }
      }
    },
  },
};
</script>

<style>
</style>