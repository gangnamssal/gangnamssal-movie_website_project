<template>
  <div>
    <h1>ChangePassword</h1>

    <label for="new_password1">비밀번호 : </label>
    <input type="password" id="new_password1" v-model="new_password1"><br>

    <label for="new_password2">비밀번호 확인 : </label>
    <input type="password" id="new_password2" v-model="new_password2">
    <button @click="changePassword">회원가입</button>
  </div>
</template>

<script>
export default {
    name:'ChangePasswordView',
    data(){
        return{
            new_password1: null,
            new_password2: null
        }
    },
    methods: {
        changePassword(){
            const new_password1 = this.new_password1
            const new_password2 = this.new_password2
            const payload = {
                new_password1,
                new_password2,
            }
            this.$store.dispatch('changePassword',payload)
        }
    }
}
</script>

<style>

</style>