import { createHead } from '@unhead/vue/client'
import axios from 'axios'
import { createSSRApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'

const app = createSSRApp(App)

app.use(createHead())
app.use(router)
app.provide('$axios', axios)
app.mount('#app')
