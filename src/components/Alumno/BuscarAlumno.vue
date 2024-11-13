<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="nombreAlumno"
          label="Buscar Alumno por Nombre"
          prepend-icon="mdi-account-search"
          outlined
          @keyup.enter="buscarAlumno"
        />
        <v-btn color="primary" @click="buscarAlumno">Buscar</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="alumno">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>Información del Alumno: {{ alumno.nombre }}</h3>
          </v-card-title>
          <v-card-text>
            <h4>Cursos:</h4>
            <v-list dense>
              <v-list-item v-for="curso in alumno.cursos" :key="curso.id">
                <v-list-item-content>
                  <v-list-item-title>{{ curso.nombre }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Profesor:
                    <span v-if="curso.profesores && curso.profesores.length > 0">
                      {{ curso.profesores[0].nombre }}
                    </span>
                    <span v-else>No asignado</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="noEncontrado">
      <v-col cols="12" class="text-center">
        <v-alert type="error" border="top">
          Alumno no encontrado.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { buscarAlumno } from '../../services/Servicios_Alumnos';

export default {
  data() {
    return {
      nombreAlumno: '',
      alumno: null,
      noEncontrado: false
    };
  },
  methods: {
    async buscarAlumno() {
      try {
        this.alumno = null;
        this.noEncontrado = false;

        const response = await buscarAlumno(this.nombreAlumno);
        console.log('Datos recibidos:', response.data); // Para verificar la estructura
        this.alumno = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.noEncontrado = true;
        } else {
          console.error('Error al buscar el alumno:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
.v-card-title h3 {
  color: #1976D2;
}
.v-list-item-title {
  font-weight: bold;
}
</style>
