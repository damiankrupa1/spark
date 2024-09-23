import { pinia } from '@/plugins/pinia';
import { useUserSessionStore } from '@/store/userSession';
import { useNotification } from "@kyvg/vue3-notification";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import type { App } from 'vue';

const { notify }  = useNotification();
const userSession = useUserSessionStore(pinia)

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/v1',
  // baseURL: import.meta.env.BASE_URL
});

axiosInstance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
  console.log('error',error)
});

export default function (app: App) {
  app.use(  
    axiosInstance
  )
}
export { axiosInstance };

