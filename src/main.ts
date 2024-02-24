import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'

const app = createApp(App)

app.use(router);
app.provide('$axios', axios);
app.mount('#app');
