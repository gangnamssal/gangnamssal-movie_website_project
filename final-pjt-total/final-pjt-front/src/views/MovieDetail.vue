<template>
  <div>
    <h1>Detail</h1>
    {{ detailMovie.title }}
  </div>
</template>

<script>
export default {
    name:'MovieDetail',
    methods:{
        getDetailMovie(){
            this.$store.commit('GET_DETAIL_MOVIE',this.$route.params.movie_id)
        }
    },
    created() {
        this.getDetailMovie()
    },
    computed: {
        detailMovie() {
            return this.$store.state.detailMovie
        }
    }
}
</script>

<style>

</style>