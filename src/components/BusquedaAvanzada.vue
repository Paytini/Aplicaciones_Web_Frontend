<template>
  <v-app>
    <!-- Barra de carga -->
    <v-progress-linear
      v-if="isLoading"
      indeterminate
      color="primary"
      height="4"
      class="loading-bar"
    ></v-progress-linear>

    <!-- Contenedor principal -->
    <v-container class="app-container">
      <!-- Logo y barra de búsqueda -->
      <v-row align="center">
        <v-col cols="12" md="2">
          <v-img
            src="../assets/download (2).png"
            class="logo"
            max-width="100"
          ></v-img>
        </v-col>

        <v-col cols="12" md="8">
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-select
                v-model="tipoEntidad"
                :items="tiposEntidad"
                label="Selecciona el tipo de entidad"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="nombre"
                label="Ingrese el nombre"
                prepend-icon="mdi-magnify"
                outlined
                dense
                @keyup.enter="realizarBusqueda"
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn color="primary" @click="realizarBusqueda" class="search-button">Buscar</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Sección para Crear Entidades -->
      <v-row class="create-section">
        <v-col cols="12" md="4">
          <v-btn color="success" @click="openCreateDialog">Crear {{ tipoEntidad }}</v-btn>
        </v-col>
      </v-row>

      <!-- Resultados de la búsqueda -->
      <v-row v-if="resultadosProcesados && resultadosProcesados.length">
        <v-col cols="12" md="8" v-for="(resultado, index) in resultadosProcesados" :key="index">
          <v-card class="result-card">
            <v-card-title>Información detallada</v-card-title>
            <v-card-text>
              <div v-if="tipoEntidad === 'Alumno'">
                <h3>Alumno: {{ resultado.nombre }}</h3>
                <p>Matrícula: {{ resultado.matricula }}</p>
                <h4>Cursos:</h4>
                <v-list dense>
                  <v-list-item v-for="curso in resultado.Cursos || []" :key="curso.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ curso.nombre }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Profesor:
                        <span>{{ curso.Profesors && curso.Profesors.length ? curso.Profesors[0].nombre : 'No asignado' }}</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-btn color="primary" @click="editarEntidad(resultado)">Editar</v-btn>
                <v-btn color="error" @click="eliminarEntidad(resultado.id)">Eliminar</v-btn>
              </div>

              <div v-else-if="tipoEntidad === 'Curso'">
                <h3>Curso: {{ resultado.nombre }}</h3>
                <h4>Profesor:
                  <span>{{ resultado.Profesors && resultado.Profesors.length ? resultado.Profesors[0].nombre : 'No asignado' }}</span>
                </h4>
                <h4>Alumnos Inscritos:</h4>
                <v-list dense>
                  <v-list-item v-for="alumno in resultado.Alumnos || []" :key="alumno.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ alumno.nombre }}</v-list-item-title>
                      <v-list-item-subtitle>Matrícula: {{ alumno.matricula }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-btn color="primary" @click="editarEntidad(resultado)">Editar</v-btn>
                <v-btn color="error" @click="eliminarEntidad(resultado.id)">Eliminar</v-btn>
              </div>

              <div v-else-if="tipoEntidad === 'Profesor'">
                <h3>Profesor: {{ resultado.nombre }}</h3>
                <h4>Cursos que imparte:</h4>
                <v-list dense>
                  <v-list-item v-for="curso in resultado.Cursos || []" :key="curso.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ curso.nombre }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-btn color="primary" @click="editarEntidad(resultado)">Editar</v-btn>
                <v-btn color="error" @click="eliminarEntidad(resultado.id)">Eliminar</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Mensaje de no encontrado -->
      <v-row v-else-if="noEncontrado">
        <v-col cols="12" class="text-center">
          <v-alert type="error" border="top">No se encontró información.</v-alert>
        </v-col>
      </v-row>
    </v-container>

    <!-- Diálogo para Crear o Editar Entidad -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>{{ editMode ? "Editar" : "Crear" }} {{ tipoEntidad }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="formData.nombre" label="Nombre"></v-text-field>
            <v-text-field v-if="tipoEntidad === 'Alumno'" v-model="formData.matricula" label="Matrícula"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="guardarEntidad">{{ editMode ? "Actualizar" : "Crear" }}</v-btn>
          <v-btn text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { buscarEntidad, crearEntidad, editarEntidad, eliminarEntidad } from '../services/Servicios_Busqueda';

export default {
  data() {
    return {
      tipoEntidad: '',
      nombre: '',
      resultados: null,
      noEncontrado: false,
      isLoading: false,
      tiposEntidad: ['Alumno', 'Profesor', 'Curso'],
      dialog: false,
      editMode: false,
      formData: { nombre: '', matricula: '' }
    };
  },
  computed: {
    resultadosProcesados() {
      return this.resultados ? this.resultados.resultados : [];
    }
  },
  methods: {
    async realizarBusqueda() {
      this.isLoading = true;
      try {
        this.resultados = null;
        this.noEncontrado = false;
        const response = await buscarEntidad(this.tipoEntidad, this.nombre);
        if (response.data && response.data.resultados.length) {
          this.resultados = response.data;
        } else {
          this.noEncontrado = true;
        }
      } catch (error) {
        console.error('Error al buscar:', error);
        this.noEncontrado = true;
      } finally {
        this.isLoading = false;
      }
    },
    openCreateDialog() {
      this.dialog = true;
      this.editMode = false;
      this.formData = { nombre: '', matricula: '' };
    },
    async guardarEntidad() {
      try {
        this.isLoading = true;
        if (this.editMode) {
          await editarEntidad(this.tipoEntidad, this.formData.id, this.formData);
        } else {
          await crearEntidad(this.tipoEntidad, this.formData);
        }
        this.dialog = false;
        this.realizarBusqueda();
      } catch (error) {
        console.error('Error al guardar la entidad:', error);
      } finally {
        this.isLoading = false;
      }
    },
    editarEntidad(entidad) {
      this.dialog = true;
      this.editMode = true;
      this.formData = { ...entidad };
    },
    async eliminarEntidad(id) {
      try {
        this.isLoading = true;
        await eliminarEntidad(this.tipoEntidad, id);
        this.realizarBusqueda();
      } catch (error) {
        console.error('Error al eliminar la entidad:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.app-container {
  background-color: #ffffff;
  padding-top: 20px;
  min-height: 100vh;
  position: relative;
}

.app-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/ISOTIPO-UABC-ESCALA-DE-GRIS.png');
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.1;
  z-index: 0;
}

.logo {
  display: block;
  margin: 0 auto;
  z-index: 1;
}

.search-button {
  margin-top: 15px;
  font-weight: bold;
}

.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}

.result-card {
  margin-top: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.v-card-title {
  font-size: 24px;
  font-weight: bold;
  color: #01579b;
}

.v-card-text h3,
.v-card-text h4 {
  color: #0288d1;
  margin: 8px 0;
}

.v-card-text p {
  color: #0277bd;
}

.v-alert {
  background-color: #ffebee;
  color: #d32f2f;
  font-weight: bold;
  z-index: 1;
}
</style>
