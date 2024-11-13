import axios from 'axios';

const API_URL = 'https://localhost:3000';

export const buscarEntidad = (tipo, nombre) =>
  axios.get(`${API_URL}/consultas/buscar-entidad`, { params: { tipo, nombre } });

export const crearEntidad = (tipo, data) =>
  axios.post(`${API_URL}/consultas/crear-${tipo.toLowerCase()}`, data);

export const editarEntidad = (tipo, id, data) => axios.put(`${API_URL}/consultas/editar-${tipo.toLowerCase()}/${id}`, data);

export const eliminarEntidad = (tipo, id) =>
  axios.delete(`${API_URL}/consultas/eliminar-${tipo.toLowerCase()}/${id}`);
