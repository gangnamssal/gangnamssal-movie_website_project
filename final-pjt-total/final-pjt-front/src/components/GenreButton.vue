<template>
  <div class="col">
    <div class="h-100">
      <span>
        <button
            class="genre-btn"
            @click="getGenreMovie"
        >{{ genre?.name }}
        </button>
      </span>
    </div>
  </div>

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
.genre-btn {
    width: 200px;
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    font-weight: 500;
    font-style: normal;
    font-size: 0.625rem;
    letter-spacing: 0.3em;
    color: rgba(223,190,106,0.7);
    border-radius: 0;
    padding: 13px 50px 15px;
    transition: all 0.7s ease-out;
    background: linear-gradient(270deg, rgba(223,190,106,0.8), rgba(146,111,52,0.8), rgba(34,34,34,0), rgba(34,34,34,0));
    background-position: 1% 50%;
    background-size: 300% 300%;
    text-decoration: none;
    margin: 0.625rem;
    border: none;
    border: 1px solid rgba(223,190,106,0.3);
}

.genre-btn:hover {
  color: #fff;
  border: 1px solid rgba(223,190,106,0);
  color: white;
  background-position: 99% 50%;
}

</style>


