import { pinia } from '@/plugins/pinia';
import { router } from "@/plugins/router/index";
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

    notify({
      title: "Success",
      type: "success"
    })
    return response;
  },
  error => {

    notify({
      title: "Error!",
      text: error.message,
      type: "error"
    })
    if (error.response) {
      if (error.response.status === 401) {
        userSession.logout();
        router.push({name: 'login'})
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

