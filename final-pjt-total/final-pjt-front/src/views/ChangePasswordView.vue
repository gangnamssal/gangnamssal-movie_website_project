<template>
  <div class="changePassword-bg">
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
.changePassword-bg{
    height: 100vh;
    background-color: #FF3CAC;
    /* background-image: linear-gradient(180deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%); */
    background: linear-gradient(to top, #c31432, #240b36); 
    display: flex;
    justify-content: center;
    align-items: center;
}
.changePassword{
    background-color: #141314;
    color: antiquewhite;
    font-family: Helvetica, sans-serif;
    width: 500px;
    display: flex;
    flex-direction: column ;
    position: absolute;
}
</style>