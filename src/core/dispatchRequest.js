"use strict";
exports.__esModule = true;
var xhr_1 = require("./xhr");
var url_1 = require("../helpers/url");
var data_1 = require("../helpers/data");
var headers_1 = require("../helpers/headers");
function dispatchRequest(config) {
    processConfig(config);
    return xhr_1["default"](config).then(function (res) {
        return transformResponseData(res);
    });
}
exports["default"] = dispatchRequest;
function processConfig(config) {
    config.url = transformURL(config);
    config.headers = transformHeaders(config); // 处理headers要在data前面，避免将data改为plainObject后再处理headers
    config.data = transformRequestData(config);
}
function transformURL(config) {
    var url = config.url, params = config.params;
    return url_1.buildURL(url, params);
}
function transformRequestData(config) {
    return data_1.transformRequest(config.data);
}
function transformHeaders(config) {
    var _a = config.headers, headers = _a === void 0 ? {} : _a, data = config.data;
    return headers_1.processHeaders(headers, data);
}
function transformResponseData(res) {
    res.data = data_1.transformResponse(res.data);
    return res;
}
