<template>
  <div class="login-container">
    <div id="g_id_onload"
         data-client_id="367614727092-f066mdrrg0cknv2u558b2u3l808p828j.apps.googleusercontent.com"
         data-callback="handleCredentialResponse"
         data-auto_prompt="false">
    </div>

    <div class="g_id_signin"
         data-type="standard"
         data-shape="rectangular"
         data-theme="outline"
         data-text="sign_in_with"
         data-size="large"
         data-logo_alignment="center">
    </div>
  </div>
</template>
  
  <script>
 import axios from 'axios';

export default {
  name: 'GoogleLoginButton',
  mounted() {
    window.handleCredentialResponse = async (response) => {
      const { credential } = response;
      console.log('Token recibido de Google:', credential);

      try {
        const backendResponse = await axios.post('https://localhost:3000/auth/google-login', 
          { token: credential }, 
          { 
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
          }
        );

        console.log('Respuesta del backend:', backendResponse.data);

        if (backendResponse.data.success) {
          alert('Inicio de sesión exitoso');
          this.$router.push('/busqueda');
          localStorage.setItem('jwt', backendResponse.data.jwt);
        } else {
          alert('Error en la autenticación');
        }
      } catch (error) {
        console.error('Error al autenticar con el backend:', error);
        alert('Error al autenticar con el backend');
      }
    };
  },
};
</script>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  text-align: center;
}

.g_id_signin {
  display: inline-block;
}
</style>
