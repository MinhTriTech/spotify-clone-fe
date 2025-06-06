import axios from '../axios';

export const register = async (userData) => {
  const response = await axios.post('api/auth/register/', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post('api/auth/login/', userData);
  return response.data;
};

export const loginWithGoogle = async (token) => {
  const response = await axios.post('api/auth/google-login/', token);
  return response.data;
};

export const fetchUserApi = async (userData) => {
  const response = await axios.get('api/auth/userInfo/', userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post('api/auth/logout/');
  return response.data;
};

export const authService = {
  fetchUserApi,
};


