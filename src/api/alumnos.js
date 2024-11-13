import axios from "axios";


export const getAlumnos = () => {
  return axios.get("http://localhost:3000/estudiantes");
};

export const getKardexData = (matricula) => {
  return axios.get(`http://localhost:3000/estudiantes/${matricula}/kardex`);
};
export const createAlumno = (alumnoData) => {
  return axios.post("http://localhost:3000/estudiantes", alumnoData);
};
export const updateAlumno = (matricula, alumnoData) => {
  return axios.put(`http://localhost:3000/estudiantes/${matricula}`, alumnoData);
};
export const deleteAlumno = (matricula) => {
  return axios.delete(`http://localhost:3000/estudiantes/${matricula}`);
};
