import axios from '../axios';

export const register = async (userData) => {
  const response = await axios.post('api/auth/register/', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post('api/auth/login/', userData);
  return response.data;
};


// Xóa sau khi test
export const getUser = async () => {
  const response = await axios.get('api/auth/userInfo/');
  return response.data;
};

