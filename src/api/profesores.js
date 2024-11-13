import axios from 'axios';

const API_URL = 'http://localhost:3000/profesores';

export const getProfesores = () => axios.get(`${API_URL}/profesores`);
export const getProfesorById = (id) => axios.get(`${API_URL}/profesores/${id}`);
export const createProfesor = (data) => axios.post(`${API_URL}/profesores`, data);
export const updateProfesor = (id, data) => axios.put(`${API_URL}/profesores/${id}`, data);
export const patchProfesor = (id, data) => axios.patch(`${API_URL}/profesores/${id}`, data);
export const deleteProfesor = (id) => axios.delete(`${API_URL}/profesores/${id}`);
export const agregarCursoAProfesor = (profesorId, cursoId) =>
  axios.post(`${API_URL}/profesores/agregar-curso`, { profesorId, cursoId });

export const eliminarCursoDeProfesor = (profesorId, cursoId) =>
  axios.post(`${API_URL}/profesores/eliminar-curso`, { profesorId, cursoId });
