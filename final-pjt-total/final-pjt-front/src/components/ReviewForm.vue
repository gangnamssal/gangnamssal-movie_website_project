<template>
  <div>
    <label for="title">제목: </label>
    <input type="text" id="title" v-model="title">
    <br>
    <label for="content">내용: </label>
    <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
    <br>
    <label for="rank">평점: </label>
    <input type="number" id="rank" min="0" max="10" step="0.5" v-model="rank">
    <button @click="addReview">저장</button>
  </div>
</template>

<script>
export default {
    name:'ReviewForm',
    props: {
        movieTitle: Array,
    },
    data(){
        return{
            title : null,
            content :null,
            rank : null
        }
    },
    methods:{
        addReview(){
            const title = this.title
            const content = this.content
            const rank = this.rank
            const movie_title = this.movieTitle[0]
            const movie_id = this.movieTitle[1]
            // console.log(movie_title)
            // console.log(movie_id)
            const payload = {
                title,
                content,
                movie_title,
                rank,
                movie_id
            }
            this.$store.dispatch('addReview',payload)
            this.title = null
            this.content = null
            this.rank = null
        }
    }
}
</script>

<style>

</style>