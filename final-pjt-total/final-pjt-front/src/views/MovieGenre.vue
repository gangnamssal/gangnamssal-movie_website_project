<template>
  <div>
    <h1>장르</h1>
    <div class="genre-container">
      <div class="item">
        <!-- 장르 정렬 -->
        <div>
          <!-- 이름순으로 정렬 -->
          <label class="rad-label" @click="nameSort">
            <input type="radio" class="rad-input" name="rad" />
            <div class="rad-design"></div>
            <div class="rad-text">이름순</div>
          </label>
          <!-- 인기순으로 정렬 -->
          <label class="rad-label" @click="popularitySort">
            <input type="radio" class="rad-input" name="rad" />
            <div class="rad-design"></div>
            <div class="rad-text">인기순</div>
          </label>
          <!-- 개봉일 순으로 정렬 -->
          <label class="rad-label" @click="releasedSort">
            <input type="radio" class="rad-input" name="rad" />
            <div class="rad-design"></div>
            <div class="rad-text">개봉일순</div>
          </label>
        </div>
        <!-- 장르 버튼 -->
        <GenreButton
          v-for="genre in genres"
          :key="genre.id"
          :genre="genre"
          @genreButtonClick="genreButtonClick"
        />
      </div>
      <!-- 장르별 영화 정보 -->
      <div class="item">
        <div
          class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
          id="genremm"
        >
          <span
            class="genre-movie"
            v-for="movie in genrepopularMovie"
            :key="movie.id"
            @click="getDetail(movie?.id)"
          >
            <img
              :src="`https://www.themoviedb.org/t/p/original${movie.poster_path}`"
              class="card-img-top"
              alt="..."
            />
            {{ movie?.title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenreButton from "@/components/GenreButton";

export default {
  name: "MovieGenre",
  components: {
    GenreButton,
  },
  methods: {
    // 라디오버튼 리셋되는 코드 작성해야함
    // 영화 상세 정보
    getDetail(movie_id) {
      this.$router.push({ name: "detail", params: { movie_id } });
    },
    // 이름순 정렬
    nameSort() {
      // const buttonTag = document.querySelector(".rad-label");
      this.$store.commit("NAME_SORT");
      // buttonTag.innerText = "이름순으로";
    },
    // 인기순 정렬
    popularitySort() {
      // const buttonTag = document.querySelector(".rad-label");
      this.$store.commit("POPULARITY_SORT");
      // buttonTag.innerText = "인기순으로";
    },
    // 최신 개봉 순 정렬
    releasedSort() {
      // const buttonTag = document.querySelector(".rad-label");
      this.$store.commit("RELEASED_SORT");
      // buttonTag.innerText = "최신 개봉일순으로";
    },
    // 장르 선택
    genreButtonClick() {
      // 라디오 버튼 초기화
      const obj = document.getElementsByClassName('rad-input');

        for (let i = 0; i < obj.length; i++) {
            obj[i].checked = false;
        }
    },
  },
  computed: {
    genres() {
      return this.$store.state.genres;
    },
    genrepopularMovie() {
      return this.$store.state.genrepopularMovie;
    },
  },
};
</script>

<style>
/* 장르 영화 style */
.genre-movie {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.genre-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 80px;
  margin: 3rem 10rem;
}

/* 정렬 라디오 버튼 style */
.rad-label {
  display: flex;
  align-items: center;

  border-radius: 100px;
  padding: 14px 16px;
  margin: 10px 0;

  cursor: pointer;
  transition: 0.3s;
}

.rad-label:hover,
.rad-label:focus-within {
  background: hsla(0, 0%, 80%, 0.14);
}

.rad-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: -1;
}

.rad-design {
  width: 22px;
  height: 22px;
  border-radius: 100px;

  background: linear-gradient(
    to right bottom,
    hsl(154, 97%, 62%),
    hsl(225, 97%, 62%)
  );
  position: relative;
}

.rad-design::before {
  content: "";

  display: inline-block;
  width: inherit;
  height: inherit;
  border-radius: inherit;

  background: hsl(0, 0%, 90%);
  transform: scale(1.1);
  transition: 0.3s;
}

.rad-input:checked + .rad-design::before {
  transform: scale(0);
}

.rad-text {
  color: hsl(0, 0%, 60%);
  margin-left: 14px;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 900;

  transition: 0.3s;
}

.rad-input:checked ~ .rad-text {
  color: hsl(0, 0%, 40%);
}
</style>