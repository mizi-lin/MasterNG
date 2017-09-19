"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var mn_req_nodata_component_1 = require("./mn-req-nodata.component");
var mn_req_service_1 = require("./mn-req.service");
var ReqHttpComponent = (function () {
    function ReqHttpComponent(_http, _rs) {
        var _this = this;
        this._http = _http;
        this._rs = _rs;
        this.loader = true;
        this.result = new core_1.EventEmitter();
        this.noData = false;
        this.noDataComponent = mn_req_nodata_component_1.MnReqNoDataComponent;
        this.process = 0;
        this.debounce_req_http = mu.debounce(function (req) {
            mu.run(req, function () {
                _this.req_http(req);
            });
        }, 300);
    }
    ReqHttpComponent.prototype.req_http = function (req) {
        var _this = this;
        var args = [];
        var method = req.method || (req.payload ? 'post' : 'get');
        switch (method) {
            case 'get':
            case 'delete':
                args = [req.params];
                break;
            case 'patch':
            case 'post':
                args = [
                    req.payload,
                    req.params
                ];
                break;
        }
        var source = mu.run(req.url, function (url) {
            return (_a = _this._http)[method].apply(_a, [url].concat(args));
            var _a;
        }, function () {
            var _resources = _this._rs.getResources();
            return (_a = _resources[req.api])[method].apply(_a, args);
            var _a;
        });
        this._observable = source.subscribe(function (res) {
            _this.process = 100;
            res = res || {};
            mu.run(res.data, function () {
                _this.result.emit(res);
            }, function () {
                _this.noData = true;
            });
        }, function () {
            _this.process = 100;
        }, function () {
            _this.process = 100;
        });
    };
    ReqHttpComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(this.req, function () {
            _this.process = mu.randomInt(0, 49);
        });
        mu.run(changes['params'] && this.req, function () {
            _this.req.params = {
                params: _this.params
            };
            _this.params = null;
            _this.debounce_req_http(_this.req);
        });
        mu.run(changes['payload'] && this.req, function () {
            _this.req.payload = _this.payload;
            _this.payload = null;
            _this.debounce_req_http(_this.req);
        });
        mu.run(changes['req'], function () {
            _this.debounce_req_http(_this.req);
        });
    };
    ReqHttpComponent.prototype.ngOnDestroy = function () {
        this._observable && this._observable.unsubscribe();
    };
    return ReqHttpComponent;
}());
ReqHttpComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'req-http',
                template: "\n        <mn-loader-bar *ngIf=\"loader\" [loaderRef]=\"loaderRef\"\n                       [progress]=\"process\"></mn-loader-bar>\n        <mn-dynamic-component *ngIf=\"noData\" [component]=\"noDataComponent\" [inputs]=\"context\"></mn-dynamic-component>\n        <ng-content *ngIf=\"!noData\"></ng-content>\n    ",
                styles: [
                    ":host {\n            display: block;\n            width: 100%;\n            height: 100%;\n        }"
                ]
            },] },
];
/** @nocollapse */
ReqHttpComponent.ctorParameters = function () { return [
    { type: http_1.Http, },
    { type: mn_req_service_1.MnReqService, },
]; };
ReqHttpComponent.propDecorators = {
    'req': [{ type: core_1.Input },],
    'params': [{ type: core_1.Input },],
    'payload': [{ type: core_1.Input },],
    'data': [{ type: core_1.Input },],
    'context': [{ type: core_1.Input },],
    'loaderRef': [{ type: core_1.Input, args: ['mnLoaderRef',] },],
    'loader': [{ type: core_1.Input, args: ['mnLoader',] },],
    'result': [{ type: core_1.Output },],
};
exports.ReqHttpComponent = ReqHttpComponent;
//# sourceMappingURL=mn-req-http.component.js.map