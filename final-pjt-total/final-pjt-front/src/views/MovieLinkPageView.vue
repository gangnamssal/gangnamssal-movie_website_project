<template>
  <div class="movieLink">
    <router-link :to="{ name : 'genre'}" id="movieLink">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        장르
    </router-link>
    <router-link :to="{ name : 'toprated'}" id="movieLink">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        명작
    </router-link>
    <router-link :to="{ name : 'nowplaying'}" id="movieLink">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        현재 상영
    </router-link>
    <router-link :to="{ name : 'upcomming'}" id="movieLink">
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
    name:'MovieLinkPageView'
}
</script>

<style>

</style>