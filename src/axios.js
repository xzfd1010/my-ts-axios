"use strict";
exports.__esModule = true;
var Axios_1 = require("./core/Axios");
var util_1 = require("./helpers/util");
function createInstance() {
    // 类上包含了扩展的方法
    var context = new Axios_1["default"]();
    // 实例指向的是request方法
    var instance = Axios_1["default"].prototype.request.bind(context);
    util_1.extend(instance, context);
    return instance;
}
var axios = createInstance();
exports["default"] = axios;
