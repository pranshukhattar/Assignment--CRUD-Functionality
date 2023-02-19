import {createPinia} from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const app = createApp(App)
    
import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId = '676785461988-icoil0dtlld2fcp5kb22llst7t94mans.apps.googleusercontent.com';
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent'
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(router).use(pinia).mount('#app')
