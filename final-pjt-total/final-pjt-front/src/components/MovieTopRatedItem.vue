<template>
  <!-- 명작 정보 -->
  <div @click="getDetail(movie?.id)">
    <div class="col">
      <div class="h-100">
        <img :src="posterUrl" class="card-img-top" :alt="movie?.title" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieTopRatedItem",
  props: {
    movie: Object,
  },
  methods: {
    // 영화 상세 정보 불러오기
    getDetail(movie_id) {
      this.$router.push({ name: "detail", params: { movie_id } });
    },
  },
  computed: {
    posterUrl() {
      const url =
        "https://www.themoviedb.org/t/p/original" + this.movie.poster_path;
      return url;
    },
  },
};
</script>

<style>
</style>