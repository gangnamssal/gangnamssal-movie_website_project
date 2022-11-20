<template>
  <span>
    <button
        @click="getGenreMovie"
    >{{ genre?.name }}</button>
  </span>
</template>

<script>
export default {
    name: 'GenreButton',
    props: {
        genre: Object,
    },
    methods: {
        getGenreMovie() {
            this.$store.dispatch('getGenreMovie', this.genre.id)
            this.$emit('genreButtonClick')
        }
    },
    computed: {
    }
}
</script>

<style>

</style>