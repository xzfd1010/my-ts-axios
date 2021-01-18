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

// 将两个对象合并
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // enumerable是true，代表对象的实例方法时可遍历的
    // console.log('key', key, Object.getOwnPropertyDescriptor(from.__proto__, key))
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
