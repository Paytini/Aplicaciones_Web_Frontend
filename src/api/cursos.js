import axios from 'axios';

const API_URL = 'http://localhost:3000/cursos';

export const getCursos = () => axios.get(`${API_URL}/cursos`);
export const getCursoById = (id) => axios.get(`${API_URL}/cursos/${id}`);
export const createCurso = (data) => axios.post(`${API_URL}/cursos`, data);
export const updateCurso = (id, data) => axios.put(`${API_URL}/cursos/${id}`, data);
export const patchCurso = (id, data) => axios.patch(`${API_URL}/cursos/${id}`, data);
export const deleteCurso = (id) => axios.delete(`${API_URL}/cursos/${id}`);

export const inscribirEstudiante = (cursoId, estudianteId) =>
  axios.post(`${API_URL}/cursos/inscribir`, { cursoId, estudianteId });

export const eliminarEstudiante = (cursoId, estudianteId) =>
  axios.post(`${API_URL}/cursos/eliminar-estudiante`, { cursoId, estudianteId });


export const asignarProfesor = (cursoId, profesorId) =>
  axios.post(`${API_URL}/cursos/asignar-profesor`, { cursoId, profesorId });

export const eliminarProfesorDeCurso = (cursoId, profesorId) =>
  axios.post(`${API_URL}/cursos/eliminar-profesor`, { cursoId, profesorId });


export const getCursosDeEstudiante = (estudianteId) =>
  axios.get(`${API_URL}/estudiantes/${estudianteId}/cursos`);


export const getProfesoresDeEstudiante = (estudianteId) =>
  axios.get(`${API_URL}/estudiantes/${estudianteId}/profesores`);


export const getCursosDeProfesor = (profesorId) =>
  axios.get(`${API_URL}/profesores/${profesorId}/cursos`);

export const getEstudiantesDeProfesor = (profesorId) =>
  axios.get(`${API_URL}/profesores/${profesorId}/estudiantes`);
