<template>
    <div class="login-container">
      <h1>Iniciar Sesión</h1>
      <GoogleLoginButton />
    </div>
  </template>
  
  <script>
  import GoogleLoginButton from "../components/GoogleButton.vue";
  
  export default {
    name: "LoginGoogle",
    components: {
      GoogleLoginButton,
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  </style>
  