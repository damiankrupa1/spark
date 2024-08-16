import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

// const userSession = useUserSessionStore(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach(async (to,from,next) => {
  
//   if (!userSession.isAuthenticated() && to.meta.auth) {
//     next({name: 'login'})
//     return 
//   }
//   if(to.name === 'login' && userSession.isAuthenticated()){
//     next({name:'dashboard'})
//     return 
//   }
//   next()
// })

export default function (app: App) {
  app.use(router)
}

export { router };

