<template>
  <!-- 리뷰 수정 -->
  <div>
    <label for="title">제목</label><br>
    <input type="text" id="title" v-model="title">
    <br>
    <label for="content">내용</label><br>
    <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
    <br>
    <div class="rank">
        <div>
            <label for="rank">평점</label>
            <input type="number" id="rank" min="0" max="10" step="0.5" v-model="rank">
        </div>
        <!-- 리뷰 작성 버튼 -->
        <button  type="button" class="btn btn-light form-button" @click="addReview" style="color:white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
        </button>
    </div>
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
            const payload = {
                title,
                content,
                movie_title,
                rank,
                movie_id
            }
            if (title === null || content === null || rank === null) {
                alert('내용을 전부 작성해주세요!')
            } else {
                this.$store.dispatch('addReview',payload)
                this.title = null
                this.content = null
                this.rank = null
            }
        }
    }
}
</script>

<style>
#title{
    width: 100%;
    border-radius: 10px;
    border: 0;
    padding: 5px;
    background-color: rgb(107, 105, 105);
}

#content{
    width: 100%;
    border-radius: 10px;
    border: 0;
    background-color: rgb(107, 105, 105);
    padding: 10px;
}

#rank{
    width: 100px;
    border-radius: 10px;
    border: 0;
    background-color: rgb(107, 105, 105);
    padding: 5px;
    margin: 3px;
}

.rank{
    display: flex;
    justify-content: space-between;
}
</style>