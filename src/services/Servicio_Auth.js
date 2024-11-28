import axios from 'axios';

const API_URL = 'https://localhost:3000/auth'; // Cambia la URL según corresponda.

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
};

export const verificarToken = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/verify-token`, { token });
        return response.data; // Retorna información del usuario si el token es válido.
    } catch (error) {
        console.error('Error al verificar el token:', error);
        throw error;
    }
};
