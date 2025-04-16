// /src/services/auth.js
import axios from '../axios';

const fetchUser = () => axios.get('/me');  
export const authService = {
  fetchUser,
};
