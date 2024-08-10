import { router } from "@/plugins/router/index";
import { createAuth } from "vue-auth3";

import driverAuthBasic from "vue-auth3/drivers/auth/basic";
import driverHttpAxios from "vue-auth3/drivers/http/axios";

driverAuthBasic.request = (auth, options, token) => {
  options.headers["Authorization"] = token

  return options
}

driverAuthBasic.response = (_, { data }) => {
  return data?.tokens?.access?.token
}

driverHttpAxios.request = async ({...args}) => {
  console.log('args', args)
  args.baseURL = 'http://localhost:3000';
  return {...args.data,...args};
}


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
