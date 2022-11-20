<template>
  <div>
    <span>{{ comment?.username }} - {{comment?.content}} &nbsp;</span>
    <button type="button" class="btn btn-light" @click="deleteComment" v-if="comment.user === userInfo.pk">삭제</button>
    <button type="button" class="btn btn-light" @click="updateComment" v-if="comment.user === userInfo.pk">수정</button>
    
    <div v-show="isUpdateComment">
      <label for="comment">댓글 작성 : </label>
      <textarea id="comment" cols="40" rows="2" v-model="updateValue"></textarea>
      <button @click="addUpdateComment">작성</button>
    </div>
  
  </div>
</template>

<script>
export default {
    name: 'CommentList',
    data() {
      return {
        isUpdateComment: false,
        updateValue: this.comment.content
      }
    },
    props: {
        comment: Object,
    },
    methods: {
      deleteComment() {
        const payload = [this.comment.review, this.comment.id]
        this.$store.dispatch('deleteComment',payload)
      },
      updateComment() {
        this.isUpdateComment = !this.isUpdateComment
      },
      addUpdateComment() {
        const payload = [this.comment.review, this.comment.id, this.updateValue]
        this.$store.dispatch('addUpdateComment',payload)
        this.isUpdateComment = !this.isUpdateComment
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