<template>
  <v-container>
    <login />
  </v-container>
</template>

<script>
import BusquedaAvanzada from '../components/BusquedaAvanzada.vue';
import login from './LoginGoogle.vue'

export default {
  components: {
    login
  }
};
</script>
