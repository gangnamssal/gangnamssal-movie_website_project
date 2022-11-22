<template>
  <div class="auth">
    <form class="authForm" @submit.prevent="getLogIn">
      <h2><span class="entypo-login"><i class="fa fa-sign-in"></i></span> Login</h2>
      <button class="submit authBtn" @click="getLogIn"><span class="entypo-lock"><i class="fa fa-lock"></i></span></button>
      <span class="entypo-user inputUserIcon">
          <i class="fa fa-user"></i>
      </span>
      <input type="text" class="user authInput" placeholder="ursername" v-model="username"/>
      <span class="entypo-key inputPassIcon">
          <i class="fa fa-key"></i>
      </span>
      <input type="password" class="pass authInput" placeholder="password" v-model="password"/>
    </form>
  </div>
  <!-- <div class="text-center auth-bg">
    <div class="auth">

      <h1>로그인</h1>

        <label for="username">ID : </label>
        <input type="text" id="username" v-model="username"><br>

        <label for="password">비밀번호 : </label>
        <input type="password" id="password" v-model="password" @keyup.enter="getLogIn"><br>

        <button class="btn btn-lg btn-primary" @click="getLogIn">로그인</button>

    </div>
  </div> -->

<!-- 이거  -->
  <!-- <div class="container">
  
  <h2><small>입장</small></h2>
  
  <form>
    <div class="group">      
      <input type="text" required id="username" v-model="username">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label for="username">아이디</label>
    </div>
      
    <div class="group">      
      <input type="password" required autocomplete="on" id="password" v-model="password" @keyup.enter="getLogIn"> 
      <span class="highlight"></span>
      <span class="bar"></span>
      <label for="password">Email</label>
    </div>
    <button class="btn btn-lg btn-primary" @click="getLogIn">로그인</button>

  </form>

  
</div> -->

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