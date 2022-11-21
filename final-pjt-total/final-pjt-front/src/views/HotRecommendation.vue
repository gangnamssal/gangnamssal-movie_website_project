<template>
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
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