import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 路由导航守卫
import {createRouterGuards} from './router-guards'
import shared from './modules/shared'
import 'nprogress/css/nprogress.css' // 进度条样式
// import Dashboard from '../views/dashboard.vue'
import common from "@/router/common";
import type { App } from 'vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Layout',
  //   component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
  //       meta: {
  //           title: '首页'
  //       },
  //       children: [
  //           ...common
  //       ]
  // },
  ...shared
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 挂载路由,创建路由导航守卫
export function setupRouter( app: App) {
  app.use(router)
  createRouterGuards(router)
}
export default router
