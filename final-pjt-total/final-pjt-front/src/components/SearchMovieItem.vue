<template>
  <!-- 영화 정보 검색 결과 -->
  <div class="col">
    <div class="h-100">
      <div @click="getDetail(movie?.id)" data-bs-dismiss="modal">
        <img
          :src="`https://www.themoviedb.org/t/p/original${movie?.poster_path}`"
          :alt="movie?.title"
          style="height: 250px"
        /><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchMovieItem",
  props: {
    movie: Object,
  },
  methods: {
    // 영화 상세 정보 가져오기
    getDetail(movie_id) {
      this.$router.push({ name: "detail", params: { movie_id } });
    },
  },
};
</script>

<style>
</style>