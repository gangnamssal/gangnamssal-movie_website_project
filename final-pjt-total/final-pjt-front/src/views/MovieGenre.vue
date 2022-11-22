<template>
  <div>
    <h1>장르</h1>







    <div class="genre-container">

      <div class="item">
            <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="sortButton">
          
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click="nameSort">이름순으로</a></li>
          <li><a class="dropdown-item" @click="popularitySort">인기순으로</a></li>
          <li><a class="dropdown-item" @click="releasedSort">개봉일순으로</a></li>
        </ul>
      </div>

        <GenreButton
        v-for="genre in genres" :key="genre.id"
        :genre="genre"
        @genreButtonClick="genreButtonClick"
        />
      </div>

      <div class="item">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="genremm">
            <span class="genre-movie" v-for="movie in genrepopularMovie" :key="movie.id" @click="getDetail(movie?.id)">
              <!-- <img :src="`https://www.themoviedb.org/t/p/original${movie.poster_path}`" alt="" class="perspectiveRight"><br> -->
              <img :src="`https://www.themoviedb.org/t/p/original${movie.poster_path}`" class="card-img-top" alt="...">
              {{ movie?.title }}
            </span>
          </div>
      </div>

    </div>

  </div>

</template>

<script>
import GenreButton from '@/components/GenreButton'

export default {
  
  name: 'MovieGenre',
  components: {
      GenreButton 
  },
  methods: {
    getDetail(movie_id) {
        this.$router.push({ name: 'detail', params: { movie_id } })
      },
      nameSort() {
        const buttonTag = document.querySelector('#sortButton')
        this.$store.commit('NAME_SORT')
        buttonTag.innerText = '이름순으로'
      },
      popularitySort() {
        const buttonTag = document.querySelector('#sortButton')
        this.$store.commit('POPULARITY_SORT')
        buttonTag.innerText = '인기순으로'
      },
      releasedSort() {
        const buttonTag = document.querySelector('#sortButton')
        this.$store.commit('RELEASED_SORT')
        buttonTag.innerText = '최신 개봉일순으로'
      },
      genreButtonClick() {
        const buttonTag = document.querySelector('#sortButton')
        buttonTag.innerText = null
      }
  },
  computed: {
    genres() {
      return this.$store.state.genres
    },
    genrepopularMovie() {
        return this.$store.state.genrepopularMovie
    },
    // posterUrl() {
    //     const url = 'https://www.themoviedb.org/t/p/original' + this.movie.poster_path
    //     return url
    // }
},
  
}
</script>

<style>

.genre-movie{
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
}

.genre-container{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 80px;
    margin: 3rem 10rem ;
}
</style>