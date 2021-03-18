/**
 * 这里按需引入lodash的一些方法,方便维护
 */

//  export  {default as xxx} from 'lodash/xxx'

// 深克隆
export { default as cloneDeep } from 'lodash/cloneDeep';
// 返回一个包含所有传入数组交集元素的新数组。
export { default as intersection } from 'lodash/intersection';
// _.get(object, path, [defaultValue])
// 获取对象指定路径的属性值
export { default as get } from 'lodash/get';
// 转换首位字母大写
export { default as upperFirst } from 'lodash/upperFirst';
// var object = { 'a': 1, 'b': '2', 'c': 3 };
// _.omit(object, ['a', 'c']); // {'b': '2'}
// 反向选择对象的值
export { default as omit } from 'lodash/omit';
// 防抖
export { default as debounce } from 'lodash/debounce';