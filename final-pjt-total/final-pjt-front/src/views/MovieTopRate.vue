<template>
  <div>
    <!-- 명작 영화 -->
    <h1>탑레이트</h1>
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
      <MovieTopRatedItem
        v-for="movie in topRatedMovie"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import MovieTopRatedItem from "@/components/MovieTopRatedItem";
export default {
  name: "MovieTopRate",
  components: {
    MovieTopRatedItem,
  },
  methods: {
    // 명작 정보 리스트 가져오기
    getTopRatedMovie() {
      this.$store.dispatch("getTopRatedMovie");
    },
  },
  computed: {
    topRatedMovie() {
      return this.$store.state.topRatedMovie;
    },
  },
  created() {
    this.getTopRatedMovie();
  },
};
</script>

<style>
</style>