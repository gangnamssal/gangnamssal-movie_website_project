<template>
  <span @click="selectedPreferenceGenre">
    <button style="width:100px; height: 30px; border-radius: 10px; margin: 2px; background-color: green; color: yellowgreen;"
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