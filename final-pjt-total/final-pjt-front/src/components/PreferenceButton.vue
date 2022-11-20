<template>
  <span @click="selectedPreferenceGenre">
    <button
    >{{ genre?.name }}</button>
  </span>
</template>

<script>
export default {
    name: 'PreferenceButton',
    props: {
        genre: Object
    },
    methods: {
        selectedPreferenceGenre() {
            this.$store.commit('SELECTED_PREFERENCE_GENRE',this.genre)
        }
    }
}
</script>

<style>

</style>