import axios from 'axios'
import { createSSRApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import posts from './posts.vue'
import router from './router'

const app = createSSRApp(App)

app.config.globalProperties.$posts = posts;
app.use(router);
app.provide('$axios', axios);
app.mount('#app');
