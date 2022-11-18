<template>
  <div>
    <span>{{ comment?.username }} - {{comment?.content}} &nbsp;</span>
    <button @click="deleteComment">삭제</button>
  </div>
</template>

<script>
export default {
    name: 'CommentList',
    props: {
        comment: Object
    },
    methods: {
      deleteComment() {
        const payload = [this.comment.review, this.comment.id]
        this.$store.dispatch('deleteComment',payload)
      }
    }
}
</script>

<style>

</style>