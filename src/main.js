import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 自定义use，通过创建文件夹
import { lazyPlugin } from "@/directives";

import App from './App.vue'
import router from './router'
import { componentPlugin } from './components';
// pinia持久化插件：
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia=createPinia()
app.use(pinia)
// 使用pinia持久化
pinia.use(piniaPluginPersistedstate)

app.use(router)
// 自定义use
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
