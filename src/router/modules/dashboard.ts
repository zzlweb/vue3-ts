// markRaw 标记一个对象，使其永远不会转换为代理。返回对象本身。运用于复杂的第三方类实例或 Vue 组件对象
import { markRaw } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
// 返回一个虚拟节点 其中包含向 Vue 描述它应在页面上渲染哪种节点的信息，包括所有子节点的描述
import { h } from 'vue'

const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [{
  path: '/dashboard',
  name: routeName,
  redirect: '/dashboard/welcome',
  component: h(markRaw(RouterTransition), { notNeedKey: true }),
  meta: {
    title: '系统看板',
    icon: 'icon-yibiaopan'
  },
  children: [
    {
      path: 'welcome',
      name: `${routeName}-welcome`,
      meta: {
        title: '首页',
        icon: 'icon-shouye',
      },
      component: () => import(/* webpackChunkName: "dashboard-welcome" */ '@/views/shared/dashboard/welcome/index.vue')
    }
  ]
}]

export default routes
