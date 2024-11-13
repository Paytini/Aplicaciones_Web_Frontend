import { createRouter, createWebHistory } from 'vue-router';
import BuscarAlumno from '../components/BusquedaAvanzada.vue';

const routes = [
  { path: '/busqueda', component: BuscarAlumno, name: 'Busqueda' },
  { path: '/:pathMatch(.*)*', redirect: '/busqueda' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
