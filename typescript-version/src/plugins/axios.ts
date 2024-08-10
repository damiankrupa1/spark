import { router } from "@/plugins/router/index";
import { useNotification } from "@kyvg/vue3-notification";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import type { App } from 'vue';

const { notify }  = useNotification();

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    console.log('here',config)
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
    console.log('here',response)

    notify({
      title: "Success",
    })
    return response;
  },
  error => {
    // console.log('here',error)
    console.log(error)
    console.log(error.AxiosError )
    console.log(error.message)
    notify({
      title: "Error!",
      text: error.message,
    })
    if (error.response) {
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

