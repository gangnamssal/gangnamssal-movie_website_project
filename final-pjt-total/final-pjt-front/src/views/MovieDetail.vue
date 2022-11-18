<template>
  <div>
    <h1>Detail</h1>
    <img :src="`https://www.themoviedb.org/t/p/original${detailMovie?.poster_path}`" alt=""><br>
    <p>영화 제목 : {{ detailMovie?.title }}</p>
    {{ detailMovie.movielike_set.length }}
    {{ detailMovie }}
    <br>
    <button @click="likeMovie" v-if="userIsLiked===false">좋아요!</button>
    <button @click="likeMovieDelete" v-else-if="userIsLiked===true">좋아취소!</button>
    <hr>
    <ReviewForm
        :movie-title="[detailMovie?.title,$route.params.movie_id]"
    />
    <hr>
    <ReviewsList
        v-for="review in detailMovie?.review_set" :key="review.id"
        :review="review"
    />

  </div>
</template>

<script>
import ReviewsList from '@/components/ReviewsList.vue';
import ReviewForm from '../components/ReviewForm.vue';


export default {
    name: "MovieDetail",
    data() {
        return {
            isLiked: false
        }
    },
    components: { 
        ReviewsList,
        ReviewForm,
    },
    methods: {
        getDetailMovie() {
            this.$store.dispatch("getDetailMovie", this.$route.params.movie_id);
        },
        likeMovie() {
            this.$store.dispatch('likeMovie', this.detailMovie.id)
        },
        likeMovieDelete() {
            const movieLikeId = this.detailMovie.movielike_set.filter((like) => {
                return like.user === this.$store.state.userInfo.pk
            })
            // console.log(movieLikeId)
            const payload = [this.$store.state.userInfo.pk, movieLikeId[0].id]
            this.$store.dispatch('likeMovieDelete',payload)
        }
    },
    created() {
        this.getDetailMovie();
    },
    computed: {
        detailMovie() {
            return this.$store.state.detailMovie
        },
        userIsLiked() {
            return this.$store.state.detailMovie.movielike_set.some((like) => {
                return like.user === this.$store.state.userInfo.pk
            })
        },
    },
}
</script>

<style>

</style>