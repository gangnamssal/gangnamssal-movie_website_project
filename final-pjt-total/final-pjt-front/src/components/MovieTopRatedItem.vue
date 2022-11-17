<template>
  <div>
    <img :src="`https://www.themoviedb.org/t/p/original${movie?.poster_path}`" alt=""><br>
    <span>{{ movie?.title }}</span>
  </div>
</template>

<script>
export default {
    name: 'MovieTopRatedItem',
    props: {
        movie:Object,
    }
}
</script>

<style>

</style>