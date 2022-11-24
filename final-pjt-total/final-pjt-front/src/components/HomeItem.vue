<template>
  <!-- 인기 영화 -->
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
  name: "HomeItem",
  props: {
    movie: Object,
  },
  computed: {
    posterUrl() {
      const url =
        "https://www.themoviedb.org/t/p/original" + this.movie.poster_path;
      return url;
    },
  },
  methods: {
    // 영화 상세 정보 불러오기
    getDetail(movie_id) {
      this.$router.push({ name: "detail", params: { movie_id } });
    },
  },
  beforerouteupdate(to, from, next) {
    this.movie_id = to.params.movie_id;
    next();
  },
};
</script>

<style>
</style>