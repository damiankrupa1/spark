import { router } from "@/plugins/router/index";
import { createAuth } from "vue-auth3";

import driverAuthBasic from "vue-auth3/drivers/auth/basic";
import driverHttpAxios from "vue-auth3/drivers/http/axios";

import type { App } from 'vue';

const auth = createAuth({
  plugins: {
    router,
  },
  drivers: {
    auth: driverAuthBasic,
    http: driverHttpAxios,
  },
})


export default function (app: App) {
  app.use(  
    auth
  )
}
export { auth };
