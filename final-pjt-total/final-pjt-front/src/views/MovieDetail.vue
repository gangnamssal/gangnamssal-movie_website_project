<template>
  <div class="detail-container">
    <div class="item">
      <!-- 영화 포스터 -->
      <img
        :src="`https://www.themoviedb.org/t/p/original${detailMovie?.poster_path}`"
        :alt="detailMovie?.title"
        style="max-width: 100%"
      />
      <!-- 좋아요 갯수 -->
      {{ detailMovie.movielike_set.length }}
      <!-- 영화 좋아요 버튼 -->
      <button
        class="like"
        @click="likeMovie"
        v-if="userIsLiked === false"
        style="color: white;"
      >
        <!-- 하트 아이콘 -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </button>
      <!-- 영화 좋아요 취소 버튼 -->
      <button
        class="like"
        @click="likeMovieDelete"
        v-else-if="userIsLiked === true"
        style="color: red"
      >
        <!-- 하트 아이콘 -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </button>


      <!-- 영화 제목, 줄거리 -->
      <p style="font-weight: bold; font-size: x-large">
        {{ detailMovie?.title }}
      </p>
      <span style="font-weight: bold"> 장르 : </span>
      <span v-for="genre in genres" :key="genre.id">{{ genre }} / </span>
      <p></p>
      <p>{{ detailMovie?.overview }}</p>
    </div>

    <div class="item">
      <!-- 리뷰폼 -->
      <div class="review-form">
        <ReviewForm
          :movie-title="[detailMovie?.title, $route.params.movie_id]"
        />
      </div>
      <!-- 리뷰리스트 -->
      <h4 class="mx-2">Reviews</h4>
      <div class="reviews">
        <ReviewsList
          v-for="review in detailMovie?.review_set"
          :key="review.id"
          :review="review"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReviewsList from "@/components/ReviewsList.vue";
import ReviewForm from "../components/ReviewForm.vue";

export default {
  name: "MovieDetail",
  data() {
    return {
      isLiked: false,
      movie_id: this.$route.params.movie_id,
      genres: null,
    };
  },
  components: {
    ReviewsList,
    ReviewForm,
  },
  methods: {
    // 영화 상세 정보
    getDetailMovie(movie_id) {
      this.$store.dispatch("getDetailMovie", movie_id);
    },
    // 영화 좋아요
    likeMovie() {
      if (this.$store.state.Token === null) {
        alert("로그인을 해주세요!");
        this.$router.push({ name: "login" });
      } else {
        this.$store.dispatch("likeMovie", this.detailMovie.id);
      }
    },
    // 영화 좋아요 취소
    likeMovieDelete() {
      if (this.$store.state.Token === null) {
        alert("로그인을 해주세요!");
        this.$router.push({ name: "login" });
      } else {
        const movieLikeId = this.detailMovie.movielike_set.filter((like) => {
          return like.user === this.$store.state.userInfo.id;
        });
        const payload = [this.$store.state.userInfo.id, movieLikeId[0].id];
        this.$store.dispatch("likeMovieDelete", payload);
      }
    },
    // 영화 장르
    getMovieGenre() {
      let genreList = [];
      const genre_ids = JSON.parse(this.detailMovie.genre_ids);
      for (let genre of genre_ids) {
        for (let genres of this.$store.state.genres) {
          if (genre === genres.id) {
            genreList.push(genres.name);
          }
        }
      }
      this.genres = genreList;
    },
  },
  created() {
    window.scrollTo(0, 0); // 태헌님 이건뭔가요?
    this.getDetailMovie(this.movie_id);
    this.getMovieGenre();
  },
  computed: {
    // 영화 상세 정보
    detailMovie() {
      return this.$store.state.detailMovie;
    },
    // 좋아요 여부
    userIsLiked() {
      return this.$store.state.detailMovie.movielike_set.some((like) => {
        return like.user === this.$store.state.userInfo.id;
      });
    },
  },

  // 태헌님 여기도 주석 달아주세요
  watch: {
    $route(to, from) {
      if (to.params !== from.params) {
        this.getDetailMovie(to.params.movie_id);
      }
    },
  },
  beforerouteupdate(to, from, next) {
    this.movie_id = to.params.movie_id;
    next();
  },
};
</script>

<style>
/* 상세정보 */
.detail-container {
  display: grid;
  grid-template-columns: minmax(400px, 1fr) 2fr;
  grid-gap: 80px;
  margin: 3rem 10rem;
  font-family: "IBMPlexSansKR-Regular";
}
/* 리뷰 폼 */
.review-form {
  padding: 20px;
  margin-bottom: 50px;
}
/* 상세 정보 전용 폰트 */
@font-face {
  font-family: "IBMPlexSansKR-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
/* 리뷰 리스트 */
.reviews {
  border: solid white 2px;
  margin: 10px;
  padding: 10px;
}
</style>