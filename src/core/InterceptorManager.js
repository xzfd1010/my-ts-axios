"use strict";
exports.__esModule = true;
var InterceptorManager = /** @class */ (function () {
    function InterceptorManager() {
        this.interceptors = [];
    }
    // 遍历拦截器
    InterceptorManager.prototype.forEach = function (fn) {
        this.interceptors.forEach(function (interceptor) {
            if (interceptor !== null) {
                fn(interceptor);
            }
        });
    };
    InterceptorManager.prototype.use = function (resolved, rejected) {
        this.interceptors.push({
            resolved: resolved,
            rejected: rejected
        });
        // 作为id
        return this.interceptors.length - 1;
    };
    InterceptorManager.prototype.eject = function (id) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    };
    return InterceptorManager;
}());
exports["default"] = InterceptorManager;
