import { axiosInstance } from '@/plugins/axios';
import { loginModel, loginResponse, registerModel, registerResponse } from '@/types/user';
import { defineStore } from 'pinia';

const setLoginData = (loginData: registerResponse) => {
  localStorage.setItem('user', JSON.stringify(loginData.user));
  localStorage.setItem('token', JSON.stringify(loginData.tokens.access));
  localStorage.setItem('tokens', JSON.stringify(loginData.tokens));
}

export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') ?? ''),
    token: JSON.parse(localStorage.getItem('token') ?? ''),
  }),
  actions: {
    async register(data:registerModel){
      const user:registerResponse = await axiosInstance.post(`/v1/auth/register`, data);    
      console.log(user)

      this.user = user;
      this.token = user.tokens.access;
      setLoginData(user);
    },
    async login(data:loginModel) {
      try{
        const user:loginResponse = await axiosInstance.post(`/v1/auth/login`, data);    

        this.user = user.user;
        this.token = user.tokens.access;
        setLoginData(user);
      } catch(error){
        console.error(error)
      }

    },
    logout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('tokens');
    }
  }
})
