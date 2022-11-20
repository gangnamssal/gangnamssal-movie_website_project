<template>
  <div>
    <span>
    <button
        @click="deleteSelectedGenre"
    >{{ genre?.name }}</button>
  </span>
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