"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var http_2 = require("@angular/common/http");
/**
 * the some angular1 resource
 * 类似 angular 1 的 resource 服务
 *
 * 处理URL, 使之 resource 化
 */
var MnResource = (function () {
    function MnResource(http) {
        this.http = http;
    }
    /**
     * URL to REST_URL
     * @param url
     * @param params
     * @param isReplace | true : 是否将不存在的占位符转为''(空)
     * @returns {{url: string, searchParams: URLSearchParams, search: any, params: any}}
     */
    /**
         * URL to REST_URL
         * @param url
         * @param params
         * @param isReplace | true : 是否将不存在的占位符转为''(空)
         * @returns {{url: string, searchParams: URLSearchParams, search: any, params: any}}
         */
    MnResource.prototype.restful = /**
         * URL to REST_URL
         * @param url
         * @param params
         * @param isReplace | true : 是否将不存在的占位符转为''(空)
         * @returns {{url: string, searchParams: URLSearchParams, search: any, params: any}}
         */
    function (url, params, isReplace) {
        if (isReplace === void 0) { isReplace = true; }
        url = url || '';
        var sp = mu.clone(params || {});
        var restParams = {};
        url = url.replace(/\{(.+?)\}/g, function (m, key) {
            return mu.run(sp[key], function (v) {
                restParams[key] = v;
                sp = mu.remove(sp, key);
                return v;
            }) || (isReplace ? '' : m);
        });
        url = url.replace(/\/$/, '');
        var searchParams = new http_1.URLSearchParams();
        mu.run(sp, function (p) {
            mu.each(p, function (v, k) { return searchParams.set(k, v); });
        });
        return {
            url: url,
            searchParams: searchParams,
            search: sp,
            params: params,
            restParams: restParams
        };
    };
    MnResource.prototype.get = function (url, search, options) {
        var rest = this.restful(url, search);
        url = rest.url;
        options = mu.extend(true, {
            search: rest.searchParams
        }, options || {});
        return this.http.get(url, options);
    };
    MnResource.prototype.post = function (url, search, data, options) {
        switch (arguments.length) {
            case 1:
                data = {};
                search = {};
                options = {};
                break;
            case 2:
                data = arguments[1];
                search = {};
                options = {};
                break;
            case 3:
                options = {};
                break;
        }
        var rest = this.restful(url, search, false);
        var restdata = this.restful(rest.url, data, true);
        options = mu.extend(true, {
            search: rest.searchParams
        }, options || {});
        return this.http.post(restdata.url, data, options);
    };
    MnResource.prototype.patch = function (url, search, data, options) {
        switch (arguments.length) {
            case 1:
                search = {};
                data = {};
                options = {};
                break;
            case 2:
                search = {};
                data = arguments[1];
                options = {};
                break;
            case 3:
                options = {};
                break;
        }
        var rest = this.restful(url, search, false);
        var restdata = this.restful(rest.url, data, true);
        options = mu.extend(true, {
            search: rest.searchParams
        }, options || {});
        return this.http.patch(restdata.url, data, options);
    };
    MnResource.prototype.delete = function (url, search, options) {
        var rest = this.restful(url, search);
        url = rest.url;
        options = mu.extend(true, {
            search: rest.searchParams
        }, options || {});
        return this.http.delete(url, options);
    };
    MnResource.prototype.pool = function (url) {
        var vm = this;
        return {
            get: function (search, options) {
                return vm.get(url, search, options);
            },
            post: function (search, data, options) {
                var args = Array.from(arguments);
                args.unshift(url);
                return vm.post.apply(vm, args);
            },
            delete: function (search, data, options) {
                var args = Array.from(arguments);
                args.unshift(url);
                return vm.delete.apply(vm, args);
            },
            patch: function (search, data, options) {
                var args = Array.from(arguments);
                args.unshift(url);
                return vm.patch.apply(vm, args);
            },
            save: function (search, data, options) {
                var primaryKey = (search || data || {}).__primary__;
                var method = (search || data || {})[primaryKey] ? 'patch' : 'post';
                var args = Array.from(arguments);
                args.unshift(url);
                return vm[method].apply(vm, args);
            }
        };
    };
    MnResource.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnResource.ctorParameters = function () { return [
        { type: http_2.HttpClient, },
    ]; };
    return MnResource;
}());
exports.MnResource = MnResource;
//# sourceMappingURL=mn-resource.js.map