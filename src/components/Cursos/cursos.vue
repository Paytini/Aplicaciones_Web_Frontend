<template>
    <v-container>
      <v-card class="mb-4">
        <v-card-title>Cursos</v-card-title>
        <v-card-subtitle>Gestión de cursos</v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" @click="openDialog">Crear Curso</v-btn>
        </v-card-actions>
      </v-card>
  
      <v-data-table :headers="headers" :items="cursos" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-btn color="info" @click="editCurso(item)">Editar</v-btn>
          <v-btn color="red" @click="deleteCurso(item.id)">Eliminar</v-btn>
        </template>
      </v-data-table>
  
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span v-if="editedIndex === -1">Crear Curso</span>
            <span v-else>Editar Curso</span>
          </v-card-title>
  
          <v-card-text>
            <v-text-field label="Nombre" v-model="editedCurso.nombre"></v-text-field>
            <v-text-field label="Clave" v-model="editedCurso.clave"></v-text-field>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="saveCurso">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import { getCursos, createCurso, updateCurso, deleteCurso } from '../../api/cursos';
  
  export default {
    data() {
      return {
        cursos: [],
        headers: [
          { text: 'Nombre', value: 'nombre' },
          { text: 'Clave', value: 'clave' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
        dialog: false,
        editedIndex: -1,
        editedCurso: {
          nombre: '',
          clave: '',
        },
      };
    },
    created() {
      this.fetchCursos();
    },
    methods: {
      async fetchCursos() {
        const response = await getCursos();
        this.cursos = response.data;
      },
      openDialog() {
        this.editedIndex = -1;
        this.editedCurso = { nombre: '', clave: '' };
        this.dialog = true;
      },
      editCurso(curso) {
        this.editedIndex = curso.id;
        this.editedCurso = { ...curso };
        this.dialog = true;
      },
      async saveCurso() {
        if (this.editedIndex === -1) {
          await createCurso(this.editedCurso);
        } else {
          await updateCurso(this.editedIndex, this.editedCurso);
        }
        this.fetchCursos();
        this.closeDialog();
      },
      async deleteCurso(id) {
        await deleteCurso(id);
        this.fetchCursos();
      },
      closeDialog() {
        this.dialog = false;
      },
    },
  };
  </script>
  