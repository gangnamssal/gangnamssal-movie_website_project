<template>
  <div>
    <p>작성자 : {{ review.username }}</p>
    <p>제목 : {{ review.title }}</p>
    <p>내용 : {{ review.content }}</p>
    <p>작성 시간 : {{ review.created_at }}</p>
    <p>수정 시간 : {{ review.updated_at }}</p>
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
    components: { 
        CommentList 
    },
    props: {
        review: Object
    }
}
</script>

<style>

</style>