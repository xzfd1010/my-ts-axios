import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>

  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  // 存储拦截器
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  // 遍历拦截器
  forEach(fn:(interceptor: Interceptor<T>) => void): void{
    this.interceptors.forEach(interceptor => {
      if(interceptor !== null){
        fn(interceptor)
      }
    })
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    // 作为id
    return this.interceptors.length - 1
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
