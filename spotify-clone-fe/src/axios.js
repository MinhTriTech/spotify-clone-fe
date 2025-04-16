import Axios from 'axios';
// import { getRefreshToken } from './utils/spotify/login';  // Nếu bạn tự xây dựng API, bạn có thể thay đổi hoặc xóa đoạn này.
import { getFromLocalStorageWithExpiry } from './utils/localstorage';

const path = '';  

const access_token = getFromLocalStorageWithExpiry('access_token');  // Lấy access token từ localStorage (vẫn dùng token nếu cần).

const axios = Axios.create({
  baseURL: path,  // Thay đổi baseURL cho API tự xây dựng.
  headers: {},
});

if (access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}

// Xử lý các phản hồi và lỗi từ API (Interceptor).
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return getRefreshToken()
        .then((token) => {
          if (!token) return Promise.reject(error);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          error.config.headers['Authorization'] = 'Bearer ' + token;
          return axios(error.config);
        })
        .catch(() => {
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('access_token');
        });
    }
    return Promise.reject(error);
  }
);

export default axios;
