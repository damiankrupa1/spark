import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { toast, type ToastOptions } from 'vue3-toastify';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}
const toastOptions = {
  autoClose: 1000,
  position: toast.POSITION.BOTTOM_RIGHT,
} as ToastOptions
const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
  response => {
    toast("Success", toastOptions);
    return response;
  },
  error => {
    if (error.response) {
      toast("Error!", toastOptions);
      if (error.response.status === 401) {
        // Redirect to login page
      } else if (error.response.status === 404) {
        // Redirect to 404 page
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
