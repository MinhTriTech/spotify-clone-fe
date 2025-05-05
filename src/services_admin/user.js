import axios from 'axios';

const API_URL = 'http://localhost:8000/api/manager/users/';

export const searchUser = async (keyword, page = 1, pageSize = 6) => {
  const response = await axios.get(`${API_URL}search/`, {
    params: {
      q: keyword,
      page: page,
      page_size: pageSize
    }
  });
  return response.data;
};


export const fetchUser = async (id) => {
  const response = await axios.get(`${API_URL}${id}/`);
  return response.data;
};



export const addUser = async (userData) => {
  const formData = new FormData();
  formData.append("username", userData.username);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("first_name", userData.first_name || "");
  formData.append("last_name", userData.last_name || "");
  formData.append("is_active", userData.is_active ? '1' : '0');
  formData.append("is_staff", userData.is_staff ? '1' : '0');
  formData.append("is_superuser", userData.is_superuser ? '1' : '0');

  const response = await axios.post(`${API_URL}add/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateUser = async (id, updateData) => {
  const response = await axios.put(`${API_URL}${id}/update/`, updateData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/delete/`);
  return response.data;
};

export const countUsers = async () => {
  const response = await axios.get(`${API_URL}count/`);
  return response.data;
};

export const resetPassword = async (id, newPassword = '123456') => {
  const response = await axios.put(`${API_URL}${id}/reset-password/`, {
    password: newPassword,
  });
  return response.data;
};
