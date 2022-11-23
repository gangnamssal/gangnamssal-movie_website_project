<template>

    <div class="detail-container">
            <div class="item">
                <!-- 영화 포스터 -->
                <img :src="`https://www.themoviedb.org/t/p/original${detailMovie?.poster_path}`" :alt="detailMovie?.title" style="max-width:100%;"><br>
                
                {{ detailMovie.movielike_set.length }}

                <!-- 영화 좋아요 버튼 -->
                <button class="like" @click="likeMovie" v-if="userIsLiked===false" style="color:white;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </button>

                <!-- 영화 좋아요 취소 버튼 -->
                <button class="like" @click="likeMovieDelete" v-else-if="userIsLiked===true" style="color:red;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </button>
                
                <!-- 영화 제목, 줄거리 -->
                <p style="font-weight: bold; font-size:x-large;">{{ detailMovie?.title }}</p>
                <p>{{ detailMovie?.overview }}</p>
            </div>
    
            <div class="item" >
                <!-- 리뷰폼 -->
                <div class="review-form">
                    <ReviewForm
                    :movie-title="[detailMovie?.title,$route.params.movie_id]"
                    />
                </div>
                
                <!-- 리뷰리스트 -->
                
                <h4 class="mx-2">Reviews</h4>    
                <div class="reviews">
                <ReviewsList v-for="review in detailMovie?.review_set" :key="review.id"
                    :review="review"
                />
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
                return like.user === this.$store.state.userInfo.id
            })
            const payload = [this.$store.state.userInfo.id, movieLikeId[0].id]
            this.$store.dispatch('likeMovieDelete',payload)
        },
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
                return like.user === this.$store.state.userInfo.id
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
.detail-container{
    display: grid;
    grid-template-columns: minmax(400px, 1fr) 2fr;
    grid-gap: 80px;
    margin: 3rem 10rem ;
    font-family:  'IBMPlexSansKR-Regular';
}
.review-form{
    /* background: linear-gradient(to bottom, #200122, #6f0000); */
    /* background: linear-gradient(to bottom, #000000, #434343);  */
    /* background: linear-gradient(to bottom, #0a0a0a, #aaaaa9);  */

    padding: 20px;
    margin-bottom: 50px;
}

@font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.reviews{
    border: solid white 2px;
    margin: 10px;
    padding: 10px;
}
</style>