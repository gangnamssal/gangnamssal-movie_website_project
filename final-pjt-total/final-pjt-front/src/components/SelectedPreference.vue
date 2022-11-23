<template>
    <div class="col">
        <div class="h-100">
            <div style="width:150px; height:180px; margin: 2px; background-color:black; color: white;" 
            @click="deleteSelectedGenre">
                <img :src="require(`../assets/genre/genre${genre.id}.png`)" alt="" style="width:150px; height:150px; margin-bottom:5px">
                {{ genre?.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SelectedPreference',
  props: {
    genre: Object,
},
  methods: {
    deleteSelectedGenre() {
        this.$store.commit('DELETE_SELECTED_GENRE', this.genre)
    }
 }
}
</script>

<style>

</style>