import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
// 注册插件
import { setupAntd, setupDirectives, setupCustomComponents, setupGlobalMethods } from '@/plugins'
import {setupStore} from '@/store'
// 创建实例
const app = createApp(App)

setupStore(app)
// 注册全局常用的ant-design-vue组件
setupAntd(app)
// 注册全局自定义组件,如：<svg-icon />
setupCustomComponents(app)
// 挂载路由
setupRouter(app)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
