"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FileSaver_js_1 = require("file-saver/FileSaver.js");
/**
 * 主要依赖file-saver.js 实现文件下载
 * @supported ES6
 */
var MnFileSaverServices = (function () {
    function MnFileSaverServices() {
    }
    /**
     * fileSaver
     * 使用ES6的特性，文本在浏览器端生成文件
     * @param {string[]} contents
     * @param {string} down_name
     * @param {string} type
     * @param options
     * @author FileSaver.js
     */
    MnFileSaverServices.prototype.fileSaver = function (contents, down_name, type, options) {
        if (type === void 0) { type = 'text/plain'; }
        if (options === void 0) { options = {}; }
        var file = new File(contents, down_name, mu.extend({ type: type }, options));
        FileSaver_js_1.saveAs(file);
    };
    /**
     * blobSaver
     * 二进制文件流下载
     * @param {Blob[]} contents
     * @param {string} down_name
     * @param {string} type
     * @param options
     * @author FileSaver.js
     */
    MnFileSaverServices.prototype.blobSaver = function (contents, down_name, type, options) {
        if (type === void 0) { type = 'text/plain'; }
        if (options === void 0) { options = {}; }
        // type = application/vnd.ms-excel'
        var blob = new Blob(contents, mu.extend({ type: type }, options));
        FileSaver_js_1.saveAs(blob, down_name);
    };
    MnFileSaverServices.prototype.csvData = function (data) {
        var content = mu.map(data, function (item) { return mu.isArray(item) ? item.join(',') : item; });
        return content.join('\n');
    };
    return MnFileSaverServices;
}());
MnFileSaverServices.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnFileSaverServices.ctorParameters = function () { return []; };
exports.MnFileSaverServices = MnFileSaverServices;
//# sourceMappingURL=mn-file-saver.services.js.map