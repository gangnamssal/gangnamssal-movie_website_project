<template>
  <div>
    <h1>네브바</h1>
    <router-link :to="{ name : 'genre'}">장르별 영화</router-link><br>
    <router-link :to="{ name : 'toprated' }">명작</router-link><br>
    <router-link :to="{ name : 'upcomming' }">개봉 예정</router-link><br>
    <router-link :to="{ name : 'nowplaying' }">현재 상영중</router-link>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style>

</style>