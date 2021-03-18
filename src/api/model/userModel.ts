// 获取角色信息
import { RoleEnum } from '@/enums/roleEnum'

/**
 * @description: 登录接口参数
 */
export interface LoginParams {
  username: string;
  password: string
}

/**
 * @description: 登录接口返回值
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
}