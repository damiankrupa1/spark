import Notifications from '@kyvg/vue3-notification';
import type { App } from 'vue';


export default function (app: App) {
  app.use(  
    Notifications
  )
}
