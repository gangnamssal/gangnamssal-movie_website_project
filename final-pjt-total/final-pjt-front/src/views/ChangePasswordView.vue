<template>
    <div class="auth">
        <form class="authForm" @submit.prevent="changePassword">
            <h2><span class="entypo-login"><i class="fa fa-sign-in"></i></span> 비밀번호 바꾸기</h2>
            <!-- 비밀번호1 -->
            <button class="submit authBtn"><span class="entypo-lock"><i class="fa fa-lock" @click="changePassword"></i></span></button>
            <span class="entypo-key inputPassIcon">
                <i class="fa fa-key"></i>
            </span>
            <input type="password" class="pass authInput" placeholder="새 비밀번호" v-model="new_password1"/>
            <!-- 비밀번호 확인 -->
            <span class="entypo-key inputPassIcon2">
                <i class="fa fa-key"></i>
            </span>
            <input type="password" class="pass authInput" placeholder="한번 더 확인" v-model="new_password2"/>
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
