<template>
  <div>
    <h1>로그인</h1>
    <label for="username">ID : </label>
    <input type="text" id="username" v-model="username"><br>

    <label for="password">비밀번호 : </label>
    <input type="password" id="password" v-model="password" @keyup.enter="getLogIn"><br>
    
    <button @click="getLogIn">로그인</button>
  </div>
</template>

<script>
export default {
    name: 'LogInView',
    data(){
      return{
        username:null,
        password:null
      }
    },
    methods:{
      getLogIn(){
        const username = this.username
        const password = this.password
        const payload = {
            username,
            password,
        }
        this.$store.dispatch('getLogIn',payload)
      }
    }


}
</script>

<style>

</style>