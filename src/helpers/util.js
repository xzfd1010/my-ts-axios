"use strict";
exports.__esModule = true;
exports.extend = exports.isPlainObject = exports.isDate = void 0;
var toString = Object.prototype.toString;
// 谓词保护
function isDate(val) {
    return toString.call(val) === '[object Date]';
}
exports.isDate = isDate;
// 会把formData等类型也认为是object
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }
// 普通对象判断方法
function isPlainObject(val) {
    return toString.call(val) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
// 将两个对象合并
function extend(to, from) {
    for (var key in from) {
        // enumerable是true，代表对象的实例方法时可遍历的
        // console.log('key', key, Object.getOwnPropertyDescriptor(from.__proto__, key))
        ;
        to[key] = from[key];
    }
    return to;
}
exports.extend = extend;
