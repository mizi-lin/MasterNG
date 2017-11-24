"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var MnI18nServices = (function () {
    function MnI18nServices(_http) {
        this._http = _http;
        /**
         * 资源存储器
         */
        this.store = {};
        /**
         * 当前资源
         */
        this.locale = {};
    }
    // setConfig(config: I18nConfig) {
    MnI18nServices.prototype.setConfig = function (config) {
        var _this = this;
        var option = {
            lang: 'en',
            prefix: '/i18n',
            suffix: '.json',
            storageKey: 'I18N_LANG'
        };
        if (!config.lang) {
            config.lang = mu.storage(config.storageKey || option.storageKey) || option.lang;
        }
        this.config = mu.extend({}, option, this.config || {}, config);
        mu.storage(this.config.storageKey, this.config.lang);
        if (this.store[this.config.lang]) {
            this.locale = this.store[this.config.lang];
            this.locale_promise = new Promise(function (resolve) {
                resolve(_this.store[_this.config.lang]);
            });
        }
        else {
            var path = this.config.prefix + "/" + this.config.lang + this.config.suffix;
            this.locale_promise = this._http.get(path).map(function (res) {
                // 多重处理, 防止用户拦截器先行使用 map 处理过数据
                var body = (res.json && mu.isFunction(res.json)) ? res.json() : res;
                return body || {};
            }).toPromise();
            this.locale_promise.then(function (res) {
                _this.store[_this.config.lang] = _this.locale = res;
            });
        }
    };
    MnI18nServices.prototype.setLang = function (lang) {
        this.setConfig({ lang: lang });
    };
    /**
     * 获得国际化结果
     * @param cb
     * @param key
     * @param params
     * @return {string}
     */
    MnI18nServices.prototype.getText = function (cb, key) {
        var _this = this;
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return this.locale_promise.then(function (res) {
            return cb(_this.translateText(res, key, params), key, params);
        });
    };
    /**
     * translate text
     * @param res
     * @param key
     * @param params
     * @return {string}
     */
    MnI18nServices.prototype.translateText = function (res, key, params) {
        if (mu.isEmpty(res)) {
            return key || '';
        }
        var toArray = function (a) {
            return !mu.isArray(a) ? [a] : a;
        };
        var concat = function (a, b) {
            return toArray(a).concat(toArray(b));
        };
        var _params = [];
        mu.each(params, function (o) {
            _params = concat(_params, o);
        });
        var text = mu.prop(res, key) || res[key] || key || '';
        /**
         * 先匹配对象属性
         * 默认对象属性为参数中的最后一个
         */
        mu.run(_params[_params.length - 1], function (obj) {
            if (mu.isObject(obj)) {
                obj = _params.pop();
                text = text.replace(/\{(.*?)\}/g, function (m, i) {
                    return mu.prop(obj, i) || m;
                });
            }
        });
        text = mu.format.apply(mu, [text].concat(_params));
        return text;
    };
    /**
     * 根据当前本地值，获取国际化结果
     * @param {string} key
     * @param params
     */
    MnI18nServices.prototype.byText = function (key) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var lang = mu.storage(this.config.storageKey) || this.config.lang;
        var locale = this.store[lang];
        return this.translateText(locale, key, params);
    };
    return MnI18nServices;
}());
MnI18nServices.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnI18nServices.ctorParameters = function () { return [
    { type: http_1.Http, },
]; };
exports.MnI18nServices = MnI18nServices;
//# sourceMappingURL=mn-i18n.services.js.map