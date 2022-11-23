<template>
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
      <RecommandGenreItem
      v-for="movie in recommandGenreMovie" :key="movie.id"
      :movie="movie"
      />
    </div>
</template>

<script>
import RecommandGenreItem from '../components/RecommandGenreItem.vue'
export default {
    components: { RecommandGenreItem },
    name:'RecommandGenreView',
    methods:{
        getRecommandGenreMovie(){
            this.$store.commit('GET_RECOMMAND_GENRE_MOVIE')
        }
    },
    created(){
        this.getRecommandGenreMovie()
    },
    computed:{
        recommandGenreMovie(){
            return this.$store.state.recommandGenreMovie
        }
    }
}
</script>

<style>

</style>