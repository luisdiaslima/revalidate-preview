import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((req) => {
  req.url = config.apiUrl + req.url;
  return req;
});

// Add Authorization header
api.interceptors.request.use((req) => {
  if (!req.headers.Authorization) {
    const token = Cookies.get('public_jwt');

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

// Handle errors; redirect to login on Unauthorized
api.interceptors.response.use(
  (res) => res,

  (res) => {
    const err = (res.response && res.response.data && res.response.data.error) || res;
    err.status = (res.response && res.response.status) || res.status;
    return Promise.reject(err);
  },
);

export default api;
