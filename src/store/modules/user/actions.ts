import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State } from './state'
import { RootState } from "@/store";
import { login } from "@/api/system/user";
import { ACCESS_TOKEN, CURRENT_USER } from "@/store/mutation-types";
import { storage } from "@/utils/Storage";
// import {LockscreenMutationType} from '@/store/modules/lockscreen/mutations'
import store from "@/store";

export enum UserActionTypes {
    Login = 'LOGIN',
    GetInfo = 'GET_INFO',
    Logout = 'LOGOUT',
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
}

export type Actions = {
    [UserActionTypes.Login](context: ActionAugments, userInfo: any): Promise<any>;
    // [UserActionTypes.GetInfo](context: ActionAugments): Promise<any>;
    // [UserActionTypes.Logout](context: ActionAugments): Promise<any>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    // 登录 login({commit} , userInfo) {}
    async [UserActionTypes.Login]({ commit }, userInfo) {
        try {
            const response = await login(userInfo)
            const { result, code, message } = response
            // 请求成功
            if (code === 0) {
                // 本地缓存token，设置过期时间为七天
                storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
                storage.set(CURRENT_USER, result, 7 * 24 * 60 * 60 * 1000)
            }
            return Promise.resolve(response)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
