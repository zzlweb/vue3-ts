// 导入角色信息
import { RoleEnum } from '@/enums/roleEnum'

//导出meta接口规范
export interface Meta {
  // 名称
  title: string;
  // 是否忽略权限
  ignoreAuthor?: boolean;
  // 用户权限
  roles?: RoleEnum[];
  // 是否固定在tab上
  affix?: boolean;
  // 是否不缓存
  noKeepAlive?: boolean;
  // tab上的图标
  icon?: string;
  // 跳转地址
  frameSrc?: string;
  // 外链接跳转地址
  externalLink?: string
}