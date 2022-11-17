<template>
  <div>
    <h1>Detail</h1>
    <img :src="`https://www.themoviedb.org/t/p/original${detailMovie.poster_path}`" alt=""><br>
    <p>영화 제목 : {{ detailMovie.title }}</p>
    <hr>
    <ReviewsList
        v-for="review in detailMovie.review_set" :key="review.id"
        :review="review"
    />

  </div>
</template>

<script>
import ReviewsList from '@/components/ReviewsList.vue';


export default {
    name: "MovieDetail",
    components: { 
        ReviewsList 
    },
    methods: {
        getDetailMovie() {
            this.$store.dispatch("getDetailMovie", this.$route.params.movie_id);
        }
    },
    created() {
        this.getDetailMovie();
    },
    computed: {
        detailMovie() {
            return this.$store.state.detailMovie;
        }
    },
}
</script>

<style>

</style>