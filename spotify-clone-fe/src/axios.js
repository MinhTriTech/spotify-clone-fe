import Axios from 'axios';
import { getFromLocalStorageWithExpiry } from './utils/localstorage';

const path = 'https://api.spotify.com/v1';

const access_token = getFromLocalStorageWithExpiry('access_token');

const axios = Axios.create({
  baseURL: path,
  headers: {},
});

// Nếu có sẵn token trong localStorage thì gắn vào
if (access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}

// Bỏ auto-refresh token
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('[Spotify API] Token không hợp lệ – bỏ qua refresh');
      // Tùy ý: bạn có thể redirect về home hoặc log thêm
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axios;
