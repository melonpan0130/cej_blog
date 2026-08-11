import { createHead } from '@unhead/vue/client'
import axios from 'axios'
import { createSSRApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import posts from './posts.json'
import router from './router'

const app = createSSRApp(App)

app.config.globalProperties.$posts = posts
app.use(createHead())
app.use(router)
app.provide('$axios', axios);
app.mount('#app');
