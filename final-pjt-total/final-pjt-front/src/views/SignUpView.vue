<template>
  <div>
    <h1>회원가입</h1>
    <label for="username">ID : </label>
    <input type="text" id="username" v-model="username"><br>

    <label for="password1">비밀번호 : </label>
    <input type="password" id="password1" v-model="password1"><br>

    <label for="password2">비밀번호 확인 : </label>
    <input type="password" id="password2" v-model="password2">
    <button @click="addSignUp">회원가입</button>
  </div>
</template>

<script>

export default {
    name:'SignUpView',
    data(){
        return{
            username: null,
            password1: null,
            password2: null
        }
    },
    methods: {
        addSignUp(){
            const username = this.username
            const password1 = this.password1
            const password2 = this.password2
            const payload = {
                username,
                password1,
                password2,
            }
            this.$store.dispatch('addSignUp',payload)
        }
    }


}
</script>

<style>

</style>