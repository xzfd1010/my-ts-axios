const toString = Object.prototype.toString

// 谓词保护
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 会把formData等类型也认为是object
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 普通对象判断方法
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
