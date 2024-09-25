import { axiosInstance } from '@/plugins/axios';
import { router } from "@/plugins/router/index";
import { loginModel, loginResponse, registerModel, registerResponse } from '@/types/user';
import { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

const setLoginData = (loginData: registerResponse) => {
  localStorage.setItem('user', JSON.stringify(loginData.user))
  localStorage.setItem('token', loginData.tokens.access.token)
  localStorage.setItem('tokens', JSON.stringify(loginData.tokens))
}

const getLocalStorageUser = (item = 'user') => {
  const data = localStorage.getItem(item) ?? null
  if(data === null){
    return data
  }
  try{
    return JSON.parse(data)
  }catch(error){
    console.error(error)
  }
}

export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    user: getLocalStorageUser(),
    token: localStorage.getItem('token'),
  }),
  actions: {
    async register(data:registerModel){
      const user:AxiosResponse<registerResponse> = await axiosInstance.post(`/auth/register`, data)    

      if(user.status !== 201){
        return
      }
      this.user = user.data
      this.token = user.data.tokens.access.token
      setLoginData(user.data)
      router.push({path: 'dashboard'})
    },
    async login(data:loginModel) {
        const user:AxiosResponse<loginResponse> = await axiosInstance.post(`/auth/login`, data)    

        if(user.statusText.toLowerCase() !== 'ok'){
          return
        }

        this.user = user.data.user
        this.token = user.data.tokens.access.token
        setLoginData(user.data)
        router.push({name: 'dashboard'})
    },
    isAuthenticated(){
      if(this.token) {
        return true
      }
      return false
    },
    logout() {
        this.user = null
        this.token = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('tokens')
        router.push({name: 'login'})
    }
  }
})
