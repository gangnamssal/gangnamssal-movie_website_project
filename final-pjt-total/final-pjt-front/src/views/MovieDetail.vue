<template>

    <div class="container">
        <div class="row row-cols-2">
            <div class="col">
                <img :src="`https://www.themoviedb.org/t/p/original${detailMovie?.poster_path}`" :alt="movie?.title" style="width:300px;"><br>
                
                {{ detailMovie.movielike_set.length }}
                <button class="like" @click="likeMovie" v-if="userIsLiked===false">🤍</button>
                <button class="like" @click="likeMovieDelete" v-else-if="userIsLiked===true">❤️</button>
                
                <p>영화 제목 : {{ detailMovie?.title }}</p>
                <p>영화 제목 : {{ detailMovie?.overview }}</p>
            </div>
    
    
            <div class="col"> 
                <div>
                    <ReviewForm
                    :movie-title="[detailMovie?.title,$route.params.movie_id]"
                    />
                </div>
                
    
                <div>
                    <ReviewsList
                        v-for="review in detailMovie?.review_set" :key="review.id"
                        :review="review"
                    />
                </div>
            </div>
        </div>

    </div>
        
</template>

<script>
import ReviewsList from '@/components/ReviewsList.vue';
import ReviewForm from '../components/ReviewForm.vue';


export default {
    name: "MovieDetail",
    data() {
        return {
            isLiked: false,
            movie_id : this.$route.params.movie_id
        }
    },
    components: { 
        ReviewsList,
        ReviewForm,
    },
    methods: {
        getDetailMovie(movie_id) {
            this.$store.dispatch("getDetailMovie", movie_id);
        },
        likeMovie() {
            this.$store.dispatch('likeMovie', this.detailMovie.id)
        },
        likeMovieDelete() {
            const movieLikeId = this.detailMovie.movielike_set.filter((like) => {
                return like.user === this.$store.state.userInfo.pk
            })
            const payload = [this.$store.state.userInfo.pk, movieLikeId[0].id]
            this.$store.dispatch('likeMovieDelete',payload)
        }
    },
    created() {
        window.scrollTo(0,0)
        this.getDetailMovie(this.movie_id)
    },
    destroyed() {
        window.scrollTo(0,0)
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
    watch: {
        $route(to, from) {
            if (to.params !== from.params) {
                this.getDetailMovie(to.params.movie_id)
            }
        }
    },
    beforerouteupdate(to, from, next) {
        this.movie_id = to.params.movie_id
        next()
    } 
}
</script>

<style>
.container{
    /* display: grid; */
    grid-template-columns: 400px 1fr;
    /* display: inline-grid; */
    grid-gap: 80px;
}
</style>