// isNavigationFailure 检测导航是否失败
import { isNavigationFailure, Router } from 'vue-router'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import NProgress from 'nprogress' // progress bar
import 'nprogress/css/nprogress.css' // 进度条样式
import { storage } from '@/utils/Storage'// 操作缓存
import { AsyncRouteActionTypes } from '@/store/modules/async-route/actions'
import { debounce } from '@/utils/lodashChunk'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 创建白名单
const allowList = ['login', 'error', 'error-404']
// 登录路由
const loginRoutePath = '/login'
// 默认路由
const defaultRoutePath = '/dashboard'

// 是否需要从后端获取菜单
const isGetMenus = debounce(({ to, from, next, hasRoute }) => {
  store.dispatch(AsyncRouteActionTypes.GenerateRoutes).then(() => {
    // 从后端获取路由成功
    if (allowList.includes(to.name as string)) return
    // ？？？？
    if (!hasRoute) {
      // 请求带有 redirect 重定向时，登录自动重定向到该地址
      const redirect = decodeURIComponent((from.query.redirect || '') as string)
      if (to.path === redirect) {
        next({ ...to, replace: true })
      } else {
        // 跳转到目的路由
        next({ ...to, replace: true })
      }
    }
  }).catch(() => next({ path: defaultRoutePath }))
}, 1800, { leading: true })

// 创建路由导航守卫
export function createRouterGuards(router: Router) {
  router.beforeEach((to, form, next) => {
    //开启加载
    NProgress.start()
    // 获取token
    const Token = storage.get(ACCESS_TOKEN)
    if (Token) {
      // 判断用户是否是前往登录页面拦截到首页
      if (to.name === 'login') {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
        // 判断这个路由是否存在
        const hasRoute = router.hasRoute(to.name!)
        // 防抖获取菜单，从后端获取路由
        isGetMenus({ to, form, next, hasRoute })
        // 在不需要权限就可进入的路由
        if (allowList.includes(to.name as string) || hasRoute) {
          // 在免登录名单，直接进入
          next()
        }
      }
    } else {
      // not login
      if (allowList.includes(to.name as string)) {
        // 在免登录名单，直接进入
        next()
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath }, replace: true })
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  })
}