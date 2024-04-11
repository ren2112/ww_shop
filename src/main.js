import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 自定义use，通过创建文件夹
import { lazyPlugin } from "@/directives";

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)
// 自定义use
app.use(lazyPlugin)
app.mount('#app')
