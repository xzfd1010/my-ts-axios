"use strict";
exports.__esModule = true;
var headers_1 = require("../helpers/headers");
var error_1 = require("../helpers/error");
function xhr(config) {
    return new Promise((function (resolve, reject) {
        var _a = config.data, data = _a === void 0 ? null : _a, url = config.url, _b = config.method, method = _b === void 0 ? 'get' : _b, headers = config.headers, responseType = config.responseType, timeout = config.timeout;
        var request = new XMLHttpRequest();
        if (responseType) {
            request.responseType = responseType;
        }
        // 添加超时参数，默认是0，永不超时
        if (timeout) {
            request.timeout = timeout;
        }
        request.open(method.toUpperCase(), url, true);
        // xhr基础知识
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 0) {
                return;
            }
            // 得到所有的响应头，以\r\n分隔
            var responseHeaders = headers_1.parseHeaders(request.getAllResponseHeaders());
            var responseData = responseType !== 'text' ? request.response : request.responseText;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            handleResponse(response);
        };
        // 网络错误
        request.onerror = function handleError() {
            reject(error_1.createError('Network Error', config, null, request));
        };
        // 超时处理
        request.ontimeout = function handleTimeout() {
            reject(error_1.createError("Timeout of " + timeout + " ms exceed", config, 'ECONNABORTED', request));
        };
        // 处理非200状态码
        Object.keys(headers).forEach(function (name) {
            // 如果数据为空，content-type没有意义，可以删掉
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name];
            }
            else {
                request.setRequestHeader(name, headers[name]);
            }
        });
        request.send(data);
        function handleResponse(response) {
            // todo 这个status有几种状态？
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            }
            else {
                reject(error_1.createError("Request failed with status code " + response.status, config, null, request, response));
            }
        }
    }));
}
exports["default"] = xhr;
