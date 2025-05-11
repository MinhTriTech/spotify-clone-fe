import Axios from 'axios';

const path = 'http://127.0.0.1:8000/';  

const axios = Axios.create({
  baseURL: path,  
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/api/auth/refresh/')) {
        console.error('Refresh token failed.');
        return Promise.reject(error);
      }

      originalRequest._retry = true; 

      try {
        await axios.post('/api/auth/refresh/'); 
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default axios;
