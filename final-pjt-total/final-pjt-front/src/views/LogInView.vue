<template>
<!--   
  <div class="text-center auth-bg">
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
  <div class="container">
  
  <h2><small>입장</small></h2>
  
  <form>
    <div class="group">      
      <input type="text" required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Name</label>
    </div>
      
    <div class="group">      
      <input type="text" required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Email</label>
    </div>
    
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

* { box-sizing:border-box; }

/* body { background:url(https://scotch.io/wp-content/uploads/2014/07/61.jpg); } */
.container 		{ 
  /* font-family:'Roboto'; */
  width:600px; 
  margin:30px auto 0; 
  display:block; 
  background:#FFF;
  padding:10px 50px 50px;
}
h2 		 { 
  text-align:center; 
  margin-bottom:50px; 
}
h2 small { 
  font-weight:normal; 
  color:#888; 
  display:block; 
}
.footer 	{ text-align:center; }
.footer a  { color:#53B2C8; }

/* form starting stylings ------------------------------- */
.group 			  { 
  position:relative; 
  margin-bottom:45px; 
}
input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus 		{ outline:none; }

/* LABEL ======================================= */
label 				 {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#5264AE;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#5264AE; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
</style>