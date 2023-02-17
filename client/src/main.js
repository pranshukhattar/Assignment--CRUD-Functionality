import {createPinia} from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

// import GAuth from 'vue3-google-oauth2'
// const gAuthOption = {
    //     // clientId: '457048656423-5jje1n3o9a2vsvhadq90ej86rjlsjhdk.apps.googleusercontent.com',
    //     clientId: '676785461988-icoil0dtlld2fcp5kb22llst7t94mans.apps.googleusercontent.com',
    //     scope: 'email',
    //     prompt: 'consent',
    // }
    
    
    // app.use(GAuth, gAuthOption)
    
import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId = '676785461988-icoil0dtlld2fcp5kb22llst7t94mans.apps.googleusercontent.com';
// let gauthClientId = '457048656423-jm3vf772f067sap0l1d2kgjan351ehql.apps.googleusercontent.com';
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent'
})

app.use(router)
app.use(createPinia()).mount('#app')
