import { router } from "@/plugins/router/index";
import { createPinia } from 'pinia';
import type { App, markRaw } from 'vue';

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

export default function (app: App) {
  app.use(pinia)
}

export { pinia };

