<template>
  <div>
    <!-- 댓글 작성 -->
    <div class="comment-form">
      <div>
        <span style="font-weight: bold;">{{ comment?.username }}&nbsp;</span>
        <span> &nbsp;{{comment?.content}}</span>
      </div>
      <div>
        <!-- 댓글 삭제 버튼 -->
        <button type="button" class="btn btn-light form-button" 
          @click="deleteComment" v-if="comment.user === userInfo.pk">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
          </svg>
        </button>
        <!-- 댓글 수정 버튼 -->
        <button type="button" class="btn btn-light form-button" 
          @click="updateComment" v-if="comment.user === userInfo.pk">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 댓글 수정 -->
    <div v-show="isUpdateComment" class="comment-form">
      <textarea id="comment" rows="1" v-model="updateValue"></textarea>
      <!-- 댓글 수정 버튼 -->
      <button @click="addUpdateComment" class="form-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
      </button>
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