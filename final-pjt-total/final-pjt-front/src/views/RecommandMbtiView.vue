<template>
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        <RecommandMbtiItem
        v-for="movie in recommandMbtiMovie" :key="movie.id"
        :movie="movie"
        />
    </div>
</template>

<script>
import RecommandMbtiItem from '../components/RecommandMbtiItem'
export default {
    components: { RecommandMbtiItem },
    name:'RecommandMbtiView',
    methods:{
        getRecommandMbtiMovie(){
            this.$store.commit('GET_RECOMMAND_MBTI_MOVIE')
        }
    },
    created(){
        this.getRecommandMbtiMovie()
    },
    computed:{
        recommandMbtiMovie(){
            return this.$store.state.recommandMbtiMovie
        }
    }
}
</script>

<style>

</style>