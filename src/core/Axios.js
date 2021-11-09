"use strict";
exports.__esModule = true;
var dispatchRequest_1 = require("./dispatchRequest");
var InterceptorManager_1 = require("./InterceptorManager");
var Axios = /** @class */ (function () {
    function Axios() {
        this.interceptors = {
            request: new InterceptorManager_1["default"](),
            response: new InterceptorManager_1["default"]()
        };
    }
    Axios.prototype.request = function (url, config) {
        if (typeof url === 'string') {
            if (!config) {
                config = {};
            }
            config.url = url;
        }
        else {
            // 此时url就是config
            config = url;
        }
        // 对于拦截器进行链式调用
        var chain = [{
                resolved: dispatchRequest_1["default"],
                rejected: undefined
            }];
        this.interceptors.request.forEach(function (interceptor) {
            chain.unshift(interceptor);
        });
        this.interceptors.response.forEach(function (interceptor) {
            chain.push(interceptor);
        });
        var promise = Promise.resolve(config);
        while (chain.length) {
            var _a = chain.shift(), resolved = _a.resolved, rejected = _a.rejected;
            promise = promise.then(resolved, rejected);
        }
        return promise;
    };
    Axios.prototype._requestMethodWithoutData = function (method, url, config) {
        return this.request(Object.assign(config || {}, {
            method: method,
            url: url
        }));
    };
    Axios.prototype._requestMethodWithData = function (method, url, data, config) {
        return this.request(Object.assign(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
    Axios.prototype.get = function (url, config) {
        return this._requestMethodWithoutData('get', url, config);
    };
    Axios.prototype["delete"] = function (url, config) {
        return this._requestMethodWithoutData('delete', url, config);
    };
    Axios.prototype.options = function (url, config) {
        return this._requestMethodWithoutData('options', url, config);
    };
    Axios.prototype.head = function (url, config) {
        return this._requestMethodWithoutData('head', url, config);
    };
    Axios.prototype.post = function (url, data, config) {
        return this._requestMethodWithData('post', url, data, config);
    };
    Axios.prototype.put = function (url, data, config) {
        return this._requestMethodWithData('put', url, data, config);
    };
    Axios.prototype.patch = function (url, data, config) {
        return this._requestMethodWithData('patch', url, data, config);
    };
    return Axios;
}());
exports["default"] = Axios;
