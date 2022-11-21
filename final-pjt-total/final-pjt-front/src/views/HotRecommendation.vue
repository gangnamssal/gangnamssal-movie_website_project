<template>
  <div>
    HotRecommendation
    <hot-recommend-item
    v-for="movie in HotMovie" :key="movie.id"
    :movie="movie"
    />
  </div>
</template>

<script>
import HotRecommendItem from '../components/HotRecommendItem.vue'
export default {
    components: { HotRecommendItem },
    name:'HotRecommendation',
    methods:{
        getHotMovie(){
            this.$store.commit('GETHOTMOVIE')
        }
    },
    created(){
        this.getHotMovie()
    },
    computed:{
      HotMovie(){
        return this.$store.state.HoTMovie
      }
    }
}
</script>

<style>

</style>