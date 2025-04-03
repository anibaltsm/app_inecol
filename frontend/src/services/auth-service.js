import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Cambia esto por tu URL de API PHP

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}login.php`, {
    username,
    password
  });
  
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};