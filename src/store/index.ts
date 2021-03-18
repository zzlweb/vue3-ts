import { createStore } from 'vuex'
import { App } from "vue";
import { store as user, UserStore, State as UserState } from '@/store/modules/user';

export type RootState = {
  user: UserState;
}

export type Store = UserStore<Pick<RootState, 'user'>>

// 在开发环境中开启logger
// const debug = process.env.NODE_ENV !== 'production';
// const plugins = debug ? [createLogger({
//   filter(mutation, stateBefore, stateAfter) {
//       // 若 mutation 需要被记录，就让它返回 true 即可
//       // 顺便，`mutation` 是个 { type, payload } 对象
//       return mutation.type !== LockscreenMutationType.SetLockTime
//   }
// })] : [];

const store = createStore<RootState>({
  modules: {
    user
  }
})

// 定义你自己的“useStore”组合函数
export function useStore(): Store {
  // return baseUseStore(key)
  return store as Store
}

// 注册使用vuex
export function setupStore(app: App) {
  app.use(store)
  console.log(store, 'vuex')
}

export default store