<template>
  <div class="movieLink">
    <!-- 장르 페이지 링크 -->
    <router-link :to="{ name: 'genre' }" id="movieLink">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      장르
    </router-link>
    <!-- 명작 페이지 링크 -->
    <router-link :to="{ name: 'toprated' }" id="movieLink">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      명작
    </router-link>
    <!-- 현재 상영 페이지 링크 -->
    <router-link :to="{ name: 'nowplaying' }" id="movieLink">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      현재 상영
    </router-link>
    <!-- 개봉 예정작 페이지 링크 -->
    <router-link :to="{ name: 'upcomming' }" id="movieLink">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      다가오는 상영
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MovieLinkPageView",
};
</script>

<style>
</style>