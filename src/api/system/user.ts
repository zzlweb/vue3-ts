import http from '@/utils/http/axios';
import { LoginParams, LoginResultModel } from '../model/userModel';

enum Api {
  login = '/admin/login',
  logout = '/login/logout'
}

/**
 * @description:用户登录
 */
export function login(params: LoginParams) {
  return http.request({
    url: Api.login,
    method: 'POST',
    params
  }, {
    isTransformRequestResult: false
  })
}