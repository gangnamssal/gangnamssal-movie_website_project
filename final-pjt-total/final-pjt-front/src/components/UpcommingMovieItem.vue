<template>
  <!-- 개봉 예정 영화 -->
  <div @click="getDetail(movie?.id)">
    <div class="col">
      <div class="h-100">
        <img :src="posterUrl" class="card-img-top" :alt="movie?.title" />
        <span>{{ movie?.title }} - </span>
        <span>{{ movie?.release_date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpcommingMovieItem",
  props: {
    movie: Object,
  },
  methods: {
    // 영화 상세 정보 가져오기
    getDetail(movie_id) {
      this.$router.push({ name: "detail", params: { movie_id } });
    },
  },
  computed: {
    // 영화 포스터
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