"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/finally");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var mn_req_service_1 = require("./mn-req.service");
/**
 * http 拦截器
 *
 * httpInterceptor.v1.0
 *
 * 1. 在 header 中设置 token
 * 2. 异常处理
 * 3. map 数据同步处理
 *
 * observable 流程处理
 * map()：遍历流
 * filter()：过滤流
 * do()：监视流（通常打个console而已）
 * catch()：捕获异常
 * subscribe()：订阅流（即执行）
 */
var MnReqInterceptorFactory = (function (_super) {
    tslib_1.__extends(MnReqInterceptorFactory, _super);
    // reqServ: ReqService;
    function MnReqInterceptorFactory(_backend, _defaultOptions, _injector, _reqServ) {
        var _this = 
        // super(backend, defaultOptions, injector);
        _super.call(this, _backend, _defaultOptions) || this;
        _this._reqServ = _reqServ;
        _this.loadComplete = mu.debounce(function () {
            _this._reqServ.progress = 100;
        }, 500);
        /**
                 * 修正 ng-module 中 $$HttpInterceptor deps 中添加 Router 与 APP_INITIALIZE 冲突
                 * fix bug: Cannot instantiate cyclic dependency
                 */
        setTimeout(function () {
            _this.router = _injector.get(router_1.Router);
        }, 0);
        return _this;
    }
    MnReqInterceptorFactory.prototype.progressStep = function () {
        var _this = this;
        var tid = setTimeout(function () {
            if (_this._reqServ.progress < mu.randomInt(80, 90)) {
                _this._reqServ.progress = _this._reqServ.progress * 1.05;
                _this.progressStep();
            }
            else {
                clearTimeout(tid);
            }
        }, mu.randomInt(300, 1200));
    };
    MnReqInterceptorFactory.prototype.addHeaderWithToken = function (headers) {
        headers = headers || new http_1.Headers();
        // Caching von Ajax Requests verhindern, vor allem vom IE
        headers.append('Cache-control', 'no-cache');
        headers.append('Cache-control', 'no-store');
        headers.append('Pragma', 'no-cache');
        headers.append('Expires', '0');
        this._reqServ.getHeaders(function (headers_map) {
            mu.each(headers_map, function (header) {
                mu.if(headers[header.method], function () {
                    var val;
                    if (typeof header.value === 'function') {
                        val = header.value();
                    }
                    else {
                        val = header.value;
                    }
                    headers[header.method](header.key, val);
                });
            });
        });
        return headers;
    };
    MnReqInterceptorFactory.prototype.map = function (observable) {
        return observable.map(function (response) {
            try {
                return response.json() || {};
            }
            catch (e) {
                return response.text();
            }
        });
    };
    MnReqInterceptorFactory.prototype.onCatch = function (error, caught, url) {
        console.error('catch::::', url);
        // Observable.empty()
        // 则不会到do中onError 中调用
        // 默认 error.status === 401 时不返回错误
        if (this._reqServ.reqCatch) {
            return this._reqServ.reqCatch(error, caught, url);
        }
        else {
            return Observable_1.Observable.throw(error);
        }
    };
    MnReqInterceptorFactory.prototype.onSuccess = function (res, url) {
        // console.log(res);
    };
    MnReqInterceptorFactory.prototype.onError = function (error, url) {
        console.error('error::::', url);
        if (this._reqServ.reqError) {
            return this._reqServ.reqError(error, url);
        }
    };
    MnReqInterceptorFactory.prototype.onFinally = function (url) {
        this.afterRequest(url);
    };
    MnReqInterceptorFactory.prototype.beforeRequest = function (url, config) {
        var _this = this;
        var progress = this._reqServ.progress;
        mu.run(progress > 0 && progress < 100, function () {
            _this._reqServ.progress += (100 - progress) * (Math.random() * .5);
        }, function () {
            _this._reqServ.progress = mu.randomInt(5, 25);
        });
        this.progressStep();
        console.log('before request:::: -> ', url, mu.prop(config, 'method'), mu.run(mu.prop(config, 'options.search'), function (search) { return search.toString(); }));
    };
    MnReqInterceptorFactory.prototype.afterRequest = function (url) {
        this.loadComplete();
        // console.debug('after:::: -> ', url);
    };
    MnReqInterceptorFactory.prototype.intercept = function (observable, url) {
        var _this = this;
        return observable.catch(function (error, caught) {
            return _this.onCatch(error, caught, url);
        }).do(function (res) {
            _this.onSuccess(res, url);
        }, function (error) {
            _this.onError(error, url);
        }).finally(function () {
            _this.onFinally(url);
        });
    };
    MnReqInterceptorFactory.prototype._like_get = function (method, url, options) {
        if (options === void 0) { options = {}; }
        options.headers = this.addHeaderWithToken(options.headers);
        var observable = _super.prototype[method].call(this, url, options);
        this.beforeRequest(url, {
            method: method,
            options: options
        });
        observable = this.map(observable);
        return this.intercept(observable, url);
    };
    MnReqInterceptorFactory.prototype._like_post = function (method, url, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        var observable = _super.prototype[method].call(this, url, body, options);
        this.beforeRequest(url, {
            method: method,
            body: body,
            options: options
        });
        observable = this.map(observable);
        return this.intercept(observable, url);
    };
    MnReqInterceptorFactory.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        var method = 'get';
        return this._like_get(method, url, options);
    };
    MnReqInterceptorFactory.prototype.delete = function (url, options) {
        var method = 'delete';
        return this._like_get(method, url, options);
    };
    MnReqInterceptorFactory.prototype.head = function (url, options) {
        var method = 'head';
        return this._like_get(method, url, options);
    };
    MnReqInterceptorFactory.prototype.options = function (url, options) {
        var method = 'options';
        return this._like_get(method, url, options);
    };
    MnReqInterceptorFactory.prototype.post = function (url, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        var method = 'post';
        return this._like_post(method, url, body, options);
    };
    MnReqInterceptorFactory.prototype.patch = function (url, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        var method = 'patch';
        return this._like_post(method, url, body, options);
    };
    MnReqInterceptorFactory.prototype.put = function (url, body, options) {
        var method = 'put';
        return this._like_post(method, url, body, options);
    };
    MnReqInterceptorFactory.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnReqInterceptorFactory.ctorParameters = function () { return [
        { type: http_1.ConnectionBackend, },
        { type: http_1.RequestOptions, },
        { type: core_1.Injector, },
        { type: mn_req_service_1.MnReqServices, },
    ]; };
    return MnReqInterceptorFactory;
}(http_1.Http));
exports.MnReqInterceptorFactory = MnReqInterceptorFactory;
//# sourceMappingURL=mn-req-interceptor.factory.js.map