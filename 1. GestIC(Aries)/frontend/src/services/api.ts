import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@GestIC:token');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export { api };
