import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Configuración global de axios para manejar errores
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Error del servidor (4xx, 5xx)
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      return Promise.reject({ message: 'No se recibió respuesta del servidor' });
    } else {
      // Error al hacer la petición
      return Promise.reject({ message: 'Error al configurar la petición' });
    }
  }
);

// src/services/auth-service.js (versión mock)
export const login = async (username, password) => {
  // Validación directa en el frontend
  if (username === 'admin' && password === 'admin') {
    const mockUser = {
      success: true,
      token: 'mock-token-' + Math.random().toString(36).substring(2),
      user: {
        username: 'admin',
        role: 'admin'
      }
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  }
  throw new Error('Credenciales incorrectas');
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};