<template>
    <span>
    <button style="width:100px; height: 30px; border-radius: 10px; margin: 2px; background-color: yellowgreen; color: green;" 
        @click="deleteSelectedGenre"
    >{{ genre?.name }}</button>
  </span>
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