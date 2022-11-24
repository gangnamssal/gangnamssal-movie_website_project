<template>
    <div class="movieLink">
      <router-link :to="{ name : 'RecommandMbtiView'}" id="movieLink">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          MBTI
      </router-link>
      <router-link :to="{ name : 'RecommandGenreView'}" id="movieLink">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          취향
      </router-link>
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
      name:'RecommandLinkPageView'
  }
  </script>
  
  <style>

  </style>