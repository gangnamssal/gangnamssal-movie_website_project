<template>
    <!-- <div class="auth-bg">
        <div class="changePassword">
            <h1>ChangePassword</h1>

            <label for="new_password1">Password</label>
            <input type="password" id="new_password1" v-model="new_password1"><br>

            <label for="new_password2">Password Comfirm </label>
            <input type="password" id="new_password2" v-model="new_password2">
            <button class="changePassword-btn" @click="changePassword">
                    CHANGE
            </button>
        </div>
    </div> -->



    <div class="auth">
    <form class="authForm" @submit.prevent="changePassword">
    <h2><span class="entypo-login"><i class="fa fa-sign-in"></i></span> ChangePassword</h2>
    <button class="submit authBtn"><span class="entypo-lock"><i class="fa fa-lock" @click="changePassword"></i></span></button>

    <span class="entypo-key inputPassIcon">
        <i class="fa fa-key"></i>
    </span>
    <input type="password" class="pass authInput" placeholder="password" v-model="new_password1"/>


    <span class="entypo-key inputPassIcon">
        <i class="fa fa-key"></i>
    </span>
    <input type="password" class="pass authInput" placeholder="password check" v-model="new_password2"/>
    </form>
    </div>


</template>

<script>
export default {
    name:'ChangePasswordView',
    data(){
        return{
            new_password1: null,
            new_password2: null,
            toggle:false
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
