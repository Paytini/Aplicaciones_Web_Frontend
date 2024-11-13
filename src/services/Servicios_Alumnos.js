import axios from 'axios';

const API_URL = 'https://localhost:3000';

export const obtenerAlumnos = () => axios.get(`${API_URL}/estudiantes/estudiantes`);
export const obtenerAlumno = (matricula) => axios.get(`${API_URL}/estudiantes/estudiantes/${matricula}`);
export const crearAlumno = (data) => axios.post(`${API_URL}/estudiantes/estudiantes`, data);
export const actualizarAlumno = (matricula, data) => axios.put(`${API_URL}/estudiantes/estudiantes/${matricula}`, data);
export const eliminarAlumno = (matricula) => axios.delete(`${API_URL}/estudiantes/estudiantes/${matricula}`);
export const buscarAlumno = (nombre) => axios.get(`${API_URL}/consultas/buscar-alumno/${nombre}`);

