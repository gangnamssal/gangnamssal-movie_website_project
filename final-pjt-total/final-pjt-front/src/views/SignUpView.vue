<template>
    <div class="auth">
        <form class="authForm" @submit.prevent="addSignUp">
            <h2><span class="entypo-login"><i class="fa fa-sign-in"></i></span> Signup</h2>
            <button class="submit signupBtn" @click="addSignUp"><span class="entypo-lock"><i class="fa fa-lock"></i></span></button>
            <!-- 아이디 -->
            <span class="entypo-user inputUserIcon">
                <i class="fa fa-user"></i>
            </span>
            <input type="text" class="user authInput" placeholder="ursername" v-model="username"/>
            <!-- 비밀번호 -->
            <span class="entypo-key inputPassIcon2">
                <i class="fa fa-key"></i>
            </span>
            <input type="password" class="pass authInput" placeholder="password" v-model="password1"/>
            <!-- 비밀번호 확인 -->
            <span class="entypo-key inputPassIcon3">
                <i class="fa fa-key"></i>
            </span>
            <input type="password" class="pass authInput" placeholder="password check" v-model="password2"/>
        </form>
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

.signupBtn {
  float:right;
  height: 193px;
  width: 50px;
  border: 0px;
  background: #e74c3c;
  border-radius:7px;
  padding: 10px;
  margin-top: 6px;
  color:white;
  font-size:22px;
}

</style>