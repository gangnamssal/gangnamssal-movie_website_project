<template>
  <div class="auth">
    <form class="authForm" @submit.prevent="getLogIn">
      <h2><span class="entypo-login"><i class="fa fa-sign-in"></i></span> Login</h2>
      <button class="submit authBtn" @click="getLogIn"><span class="entypo-lock"><i class="fa fa-lock"></i></span></button>
      <!-- 아이디 입력 -->
      <span class="entypo-user inputUserIcon">
          <i class="fa fa-user"></i>
      </span>
      <input type="text" class="user authInput" placeholder="ursername" v-model="username"/>
      <!-- 비밀번호 입력 -->
      <span class="entypo-key inputPassIcon2">
          <i class="fa fa-key"></i>
      </span>
      <input type="password" class="pass authInput" placeholder="password" v-model="password"/>
    </form>
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
        this.$store.dispatch('getProfileDetail')
      }
    }


}
</script>

<style>

</style>