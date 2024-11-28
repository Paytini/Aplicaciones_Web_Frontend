import { createRouter, createWebHistory } from 'vue-router';
import BuscarAlumno from '../components/BusquedaAvanzada.vue';
import Login from '../views/LoginGoogle.vue';

const routes = [
  { path: '/busqueda', component: BuscarAlumno, name: 'Busqueda' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
