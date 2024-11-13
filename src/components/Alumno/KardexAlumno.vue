<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Kardex del Alumno</h2>
          <!-- Selección de alumno -->
          <v-autocomplete
            :items="alumnos"
            item-text="nombre"
            item-value="matricula"
            label="Selecciona un alumno"
            v-model="selectedAlumno"
            @change="fetchKardexData"
          ></v-autocomplete>
        </v-col>
      </v-row>
  
      <v-row v-if="kardexData">
        <!-- Información del alumno -->
        <v-col cols="12" md="4">
          <v-card outlined>
            <v-card-title>{{ kardexData.alumno.nombre }}</v-card-title>
            <v-card-subtitle>Matrícula: {{ kardexData.alumno.matricula }}</v-card-subtitle>
          </v-card>
        </v-col>
  
        <!-- Cursos y Maestros -->
        <v-col cols="12" md="8">
          <v-card outlined>
            <v-card-title>Cursos y Maestros Asociados</v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="curso in kardexData.cursos" :key="curso.clave">
                  <v-list-item-content>
                    <v-list-item-title>{{ curso.nombre }} - {{ curso.clave }}</v-list-item-title>
                    <v-list-item-subtitle>
                      Profesor: {{ curso.profesor.nombre }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { getKardexData, getAlumnos } from "../../api/alumnos"; // Asegúrate de tener este endpoint
  
  export default {
    data() {
      return {
        alumnos: [], // Lista de alumnos para el autocomplete
        selectedAlumno: null,
        kardexData: null, // Datos del alumno seleccionado (cursos y maestros)
      };
    },
    methods: {
      async fetchAlumnos() {
        try {
          const response = await getAlumnos();
          this.alumnos = response.data;
        } catch (error) {
          console.error("Error al cargar alumnos:", error);
        }
      },
      async fetchKardexData() {
        if (!this.selectedAlumno) return;
  
        try {
          const response = await getKardexData(this.selectedAlumno); // Pasa la matrícula del alumno
          this.kardexData = response.data;
        } catch (error) {
          console.error("Error al cargar el kardex del alumno:", error);
        }
      },
    },
    created() {
      this.fetchAlumnos();
    },
  };
  </script>
  
  <style scoped>
  /* Opcional: estilos personalizados */
  </style>
  