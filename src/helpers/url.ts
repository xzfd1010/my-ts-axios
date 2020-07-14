import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/gi, '+') // 空格变为'+'号
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 将params中的参数拼接到url上
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  // 键值对数组
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key] // 当前key对应的value
    if (val === null || val === undefined) {
      // 跳到下次循环
      return
    }
    // 值统一为数组
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]' // 标识目前的value是数组，符合url的规范 foo:['foo','bar'] 对应的url 应为 foo[]=foo&foo[]=bar
    } else {
      values = [val]
    }
    // values处理为数组
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
