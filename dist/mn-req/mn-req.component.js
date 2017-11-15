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
        this.loading = true;
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
            return _resources[req.api][method](req.params || {}, req.payload || {});
        });
        this._observable = source.subscribe(function (res) {
            _this.process = 100;
            res = res || {};
            mu.run(res.data, function () {
                _this.noData = false;
            }, function () {
                _this.noData = true;
            });
            _this.result.emit(res);
        }, function () {
            _this.process = 100;
        }, function () {
            _this.process = 100;
        });
    };
    ReqHttpComponent.prototype.processStep = function () {
        var _this = this;
        var tid = setTimeout(function () {
            if (_this.process < mu.randomInt(75, 85)) {
                _this.process = _this.process * 1.05;
                _this.processStep();
            }
            else {
                clearTimeout(tid);
            }
        }, mu.randomInt(300, 1200));
    };
    ReqHttpComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(this.req, function () {
            _this.process = mu.randomInt(0, 49);
            _this.processStep();
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
                selector: 'mn-req',
                template: "\n        <ng-template [ngIf]=\"loading\">\n            <mn-loader-bar [loader]=\"loader\"\n                           [loaderStyle]=\"loaderStyle\"\n                           [progress]=\"process\"></mn-loader-bar>\n        </ng-template>\n\n        <mn-dynamic-component *ngIf=\"noData\" [component]=\"noDataComponent\" [inputs]=\"context\"></mn-dynamic-component>\n        <ng-content *ngIf=\"!noData\"></ng-content>\n    ",
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
    'loader': [{ type: core_1.Input },],
    'loading': [{ type: core_1.Input },],
    'loaderStyle': [{ type: core_1.Input },],
    'result': [{ type: core_1.Output },],
};
exports.ReqHttpComponent = ReqHttpComponent;
//# sourceMappingURL=mn-req.component.js.map