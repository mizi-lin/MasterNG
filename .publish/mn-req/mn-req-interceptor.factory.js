"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
var mn_req_service_1 = require("./mn-req.service");
/**
 * observable 流程处理
 * map()：遍历流
 * filter()：过滤流
 * do()：监视流（通常打个console而已）
 * catch()：捕获异常
 * subscribe()：订阅流（即执行）
 */
var MnReqInterceptorFactory = (function () {
    function MnReqInterceptorFactory(_mrs) {
        var _this = this;
        this._mrs = _mrs;
        this.loadComplete = mu.debounce(function () {
            _this._mrs.progress = 100;
        }, 500);
    }
    MnReqInterceptorFactory.prototype.intercept = function (req, next) {
        var _this = this;
        /**
                 * 设置Headers
                 * @type {HttpRequest<any>}
                 * @private
                 */
        var _req = req.clone({
            setHeaders: {
                'Cache-control': 'no-store,no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        // 获取cunstom 设置的 headers 参数
        this._mrs.getHeaders(function (headers_map) {
            mu.each(headers_map, function (hm) {
                var value = typeof hm.value === 'function' ? hm.value() : hm.value;
                if (mu.isExist(value)) {
                    _req = _req.clone({ headers: _req.headers[hm.method](hm.key, value) });
                }
            });
        });
        /**
                 * pre Request
                 */
        this.beforeRequest(_req.url, _req);
        /**
                 * Request
                 */
        var request = next.handle(_req);
        return request.catch(function (error, caught) {
            /**
                         * 在 catch 的时候抛错
                         *
                         * Observable.throw(error) => error
                         * Observable.empty() => 错误不往下走
                         */
            console.error('catch::::', error.url);
            if (_this._mrs.reqCatch) {
                return _this._mrs.reqCatch(error, caught, error.url) || Rx_1.Observable.throw(error);
            }
            else {
                return Rx_1.Observable.throw(error);
            }
        }).do(function (event) {
        }, function (error) {
            console.error('error::::', error.url);
        }).finally(function () {
            /**
                         * Request
                         */
            /**
             * Request
             */
            _this.afterRequest();
        });
    };
    MnReqInterceptorFactory.prototype.progressStep = function () {
        var _this = this;
        var tid = setTimeout(function () {
            if (_this._mrs.progress < mu.randomInt(80, 90)) {
                _this._mrs.progress = _this._mrs.progress * 1.05;
                _this.progressStep();
            }
            else {
                clearTimeout(tid);
            }
        }, mu.randomInt(300, 1200));
    };
    MnReqInterceptorFactory.prototype.beforeRequest = function (url, config) {
        var _this = this;
        var progress = this._mrs.progress;
        mu.run(progress > 0 && progress < 100, function () {
            _this._mrs.progress += (100 - progress) * (Math.random() * .5);
        }, function () {
            _this._mrs.progress = mu.randomInt(5, 25);
        });
        this.progressStep();
        console.log('before request:::: -> ', url, mu.prop(config, 'method'), mu.run(mu.prop(config, 'options.search'), function (search) { return search.toString(); }));
    };
    MnReqInterceptorFactory.prototype.afterRequest = function () {
        this.loadComplete();
    };
    MnReqInterceptorFactory.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnReqInterceptorFactory.ctorParameters = function () { return [
        { type: mn_req_service_1.MnReqServices, },
    ]; };
    return MnReqInterceptorFactory;
}());
exports.MnReqInterceptorFactory = MnReqInterceptorFactory;
//# sourceMappingURL=mn-req-interceptor.factory.js.map