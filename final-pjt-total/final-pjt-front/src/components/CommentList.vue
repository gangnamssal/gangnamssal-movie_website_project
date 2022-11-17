<template>
  <div>
    <p>{{ comment.username }} - {{comment.content}}</p>
  </div>
</template>

<script>
export default {
    name: 'CommentList',
    props: {
        comment: Object
    }
}
</script>

<style>

</style>