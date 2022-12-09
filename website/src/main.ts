import { createApp } from 'vue'

import App from './App.vue'
import './index.css'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import { router } from './services/router'


const app = createApp(App);
app.use(router)
    .use(plugin, defaultConfig)
    .mount('#app')


app.config.errorHandler = (err, instance, info) => {
    console.error('errorororo', err, instance, info);
}
