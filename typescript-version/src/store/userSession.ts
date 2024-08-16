import { axiosInstance } from '@/plugins/axios';
import { router } from "@/plugins/router/index";
import { loginModel, loginResponse, registerModel, registerResponse } from '@/types/user';
import { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

const setLoginData = (loginData: registerResponse) => {
  localStorage.setItem('user', JSON.stringify(loginData.user))
  localStorage.setItem('token', JSON.stringify(loginData.tokens.access.token))
  localStorage.setItem('tokens', JSON.stringify(loginData.tokens))
}

const getLocalStorageUser = (item = 'user') => {
  const data = localStorage.getItem(item) ?? null
  // console.log(data)
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
    token: getLocalStorageUser('token'),
  }),
  actions: {
    async register(data:registerModel){
      const user:AxiosResponse<registerResponse> = await axiosInstance.post(`/v1/auth/register`, data)    

      if(user.status !== 201){
        return
      }
      this.user = user.data
      this.token = user.data.tokens.access.token
      setLoginData(user.data)
      router.push({path: 'dashboard'})
    },
    async login(data:loginModel) {
        const user:AxiosResponse<loginResponse> = await axiosInstance.post(`/v1/auth/login`, data)    

        if(user.statusText.toLowerCase() !== 'ok'){
          return
        }

        this.user = user.data.user
        // console.log('user.data.tokens.access.token',user.data.tokens.access)
        this.token = user.data.tokens.access.token
        // console.log('this.token',this.token)
        setLoginData(user.data)
        router.push({name: 'dashboard'})
    },
    isAuthenticated(){
      console.log('this.token isAuthenticated',this.token)
      if(this.token) {
        return true
      }
      return false
    },
    logout() {
        this.user = null
        this.token = null
        console.log('this.token',this.token)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('tokens')
        // console.log('here')
        // console.log(this.router)
        router.push({name: 'login'})
    }
  }
})
