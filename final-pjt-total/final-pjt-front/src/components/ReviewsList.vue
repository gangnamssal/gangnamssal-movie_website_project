<template>
  <div>
    <p>작성자 : {{ review?.username }}</p>
    <p>제목 : {{ review?.title }}</p>
    <p>내용 : {{ review?.content }}</p>
    <p>평점 : {{ review?.rank }}</p>
    <p>작성 시간 : {{ review?.created_at }}</p>
    <p>수정 시간 : {{ review?.updated_at }}</p>
    <button @click="deleteReview" v-if="review.user === userInfo.pk">리뷰 삭제</button>
    <button @click="updateReview" v-if="review.user === userInfo.pk">리뷰 수정</button>

    <div v-show="isUpdate">
        <label for="title">제목: </label>
        <input type="text" id="title" v-model="title">
        <br>
        <label for="content">내용: </label>
        <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
        <br>
        <label for="rank">평점: </label>
        <input type="number" id="rank" min="0" max="10" step="0.5" v-model="rank">
        <button @click="saveUpdateReview">저장</button>
    </div>


    <p>|댓글|</p>
    <CommentList
        v-for="comment in review.comment_set" :key="comment.id"
        :comment="comment"
    />
    <hr>
 </div>
</template>

<script>
import CommentList from '@/components/CommentList.vue'
export default {
    name: 'ReviewsList',
    data() {
        return{
            isUpdate: false,
            title: this.review.title,
            content: this.review.content,
            rank: this.review.rank
        }
    },
    components: { 
        CommentList 
    },
    props: {
        review: Object
    },
    methods: {
        deleteReview() {
            this.$store.dispatch('deleteReview',this.review.id)
        },
        updateReview() {
            this.isUpdate = !this.isUpdate
        },
        saveUpdateReview() {
            const title = this.title
            const content = this.content
            const rank = this.rank
            const movie_title = this.review.movie_title
            const review_id = this.review.id
            const payload = {
                title,
                content,
                rank,
                review_id,
                movie_title
            }
            this.$store.dispatch('saveUpdateReview',payload)
            this.isUpdate = !this.isUpdate
        }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      }
    }

}
</script>

<style>

</style>