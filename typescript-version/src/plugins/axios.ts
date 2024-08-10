import { router } from "@/plugins/router/index";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import type { App } from 'vue';
import { toast, type ToastOptions } from 'vue3-toastify';
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}
const toastOptions = {
  autoClose: 1000,
  position: toast.POSITION.BOTTOM_RIGHT,
} as ToastOptions
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
  console.log('error',error)
});

axiosInstance.interceptors.response.use(
  response => {
    toast("Success", toastOptions);
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response)
      toast("Error!", toastOptions);
      if (error.response.status === 401) {
        router.push({path: 'login'})
      } else if (error.response.status === 404) {
        router.push({path: '/:pathMatch(.*)*'})
      }
    }
    return Promise.reject(error);
  }
);
export default function (app: App) {
  app.use(  
    axiosInstance
  )
}
export { axiosInstance };

