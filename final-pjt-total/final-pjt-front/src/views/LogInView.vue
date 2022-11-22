<template>
  
  <div class="text-center auth-bg">
    <div class="auth">

      <h1>로그인</h1>

        <label for="username">ID : </label>
        <input type="text" id="username" v-model="username"><br>

        <label for="password">비밀번호 : </label>
        <input type="password" id="password" v-model="password" @keyup.enter="getLogIn"><br>

        <button class="btn btn-lg btn-primary" @click="getLogIn">로그인</button>

    </div>
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
.auth-bg{
    height: 100vh;
    background-color: #FF3CAC;
    /* background-image: linear-gradient(180deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%); */
    background: linear-gradient(to top, #7F4D3E, #E2B659); 
    display: flex;
    justify-content: center;
    align-items: center;
}
.auth{
    /* background-color: #bd8408; */
    color: antiquewhite;
    font-family: Helvetica, sans-serif;
    width: 500px;
    display: flex;
    flex-direction: column ;
    position: absolute;
}
</style>