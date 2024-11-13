<template>
    <v-container>
      <v-card class="mb-4">
        <v-card-title>Profesores</v-card-title>
        <v-card-subtitle>Gestión de profesores</v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" @click="openDialog">Crear Profesor</v-btn>
        </v-card-actions>
      </v-card>
  
      <v-data-table :headers="headers" :items="profesores" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-btn color="info" @click="editProfesor(item)">Editar</v-btn>
          <v-btn color="red" @click="deleteProfesor(item.id)">Eliminar</v-btn>
        </template>
      </v-data-table>
  
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span v-if="editedIndex === -1">Crear Profesor</span>
            <span v-else>Editar Profesor</span>
          </v-card-title>
  
          <v-card-text>
            <v-text-field label="Nombre" v-model="editedProfesor.nombre"></v-text-field>
            <v-text-field label="Número de empleado" v-model="editedProfesor.numeroEmpleado"></v-text-field>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="saveProfesor">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import { getProfesores, createProfesor, updateProfesor, deleteProfesor } from '../../api/profesores';
  
  export default {
    data() {
      return {
        profesores: [],
        headers: [
          { text: 'Nombre', value: 'nombre' },
          { text: 'Número de Empleado', value: 'numeroEmpleado' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
        dialog: false,
        editedIndex: -1,
        editedProfesor: {
          nombre: '',
          numeroEmpleado: '',
        },
      };
    },
    created() {
      this.fetchProfesores();
    },
    methods: {
      async fetchProfesores() {
        const response = await getProfesores();
        this.profesores = response.data;
      },
      openDialog() {
        this.editedIndex = -1;
        this.editedProfesor = { nombre: '', numeroEmpleado: '' };
        this.dialog = true;
      },
      editProfesor(profesor) {
        this.editedIndex = profesor.id;
        this.editedProfesor = { ...profesor };
        this.dialog = true;
      },
      async saveProfesor() {
        if (this.editedIndex === -1) {
          await createProfesor(this.editedProfesor);
        } else {
          await updateProfesor(this.editedIndex, this.editedProfesor);
        }
        this.fetchProfesores();
        this.closeDialog();
      },
      async deleteProfesor(id) {
        await deleteProfesor(id);
        this.fetchProfesores();
      },
      closeDialog() {
        this.dialog = false;
      },
    },
  };
  </script>
  