import { axiosInstance } from '@/plugins/axios'
import { loginModel, loginResponse, registerModel, registerResponse } from '@/types/user'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

const setLoginData = (loginData: registerResponse) => {
  localStorage.setItem('user', JSON.stringify(loginData.user))
  localStorage.setItem('token', JSON.stringify(loginData.tokens.access))
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
    token: getLocalStorageUser('token'),
  }),
  actions: {
    async register(data:registerModel){
      const user:AxiosResponse<registerResponse> = await axiosInstance.post(`/v1/auth/register`, data)    

      if(user.status !== 201){
        return
      }
      this.user = user.data
      this.token = user.data.tokens.access
      setLoginData(user.data)
      this.router.push({name: 'dashboard'})
    },
    async login(data:loginModel) {
        const user:loginResponse = await axiosInstance.post(`/v1/auth/login`, data)    

        this.user = user.user
        this.token = user.tokens.access
        setLoginData(user)
    },
    logout() {
        this.user = null
        this.token = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('tokens')
    }
  }
})
