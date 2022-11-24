<template>
    <div>
        <!-- 로그인되지 않은 사용자 -->
        <div v-if="!token" class="movieLink">
            <router-link :to="{ name : 'signup'}" id="movieLink">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                장부 등록(회원가입)
            </router-link>
            <router-link :to="{ name : 'login'}" id="movieLink">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                로그인
            </router-link>
        </div>

        <!-- 로그인된 사용자 -->
        <div v-else-if="token" class="movieLink">
            <a @click.prevent="goToProfile" href="#" id="movieLink">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                내 장부
            </a>
            <a @click="logOut" id="movieLink">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                내 흔적 지우기
            </a>
            <router-link :to="{ name : 'changepassword'}" id="movieLink">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                비밀번호 변경
            </router-link>
        </div>

    </div>
  </template>
  
  <script>
  export default {
      name:'AuthLinkPageView',
      computed: {
        token() {
            return this.$store.state.Token
        },
      },
      methods: {
        goToProfile() {
        if (this.$store.state.userProfile === null) {
          alert('프로필을 생성해야합니다.!')
          this.$router.push({ name : 'ProfileCreateView' })
        } else {
          this.$router.push({ name : 'profile', params: { user_id : this.$store.state.userInfo.id }})
        }
      },
      logOut(){
        this.$store.dispatch('logOut')
      },
      }
  }
  </script>
  
  <style>

  </style>