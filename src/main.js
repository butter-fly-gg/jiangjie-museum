import { createApp } from 'vue'
import App from './App.vue'
// 引入路由配置
import router from './router'
//引入全局样式
import './assets/css/global.css'
// 创建 Vue 应用
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载到页面
app.mount('#app')
