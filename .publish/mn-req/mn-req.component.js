"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_req_nodata_component_1 = require("./mn-req-nodata.component");
var mn_req_service_1 = require("./mn-req.service");
var http_1 = require("@angular/common/http");
var MnReqHttpComponent = (function () {
    function MnReqHttpComponent(_http, _rs) {
        var _this = this;
        this._http = _http;
        this._rs = _rs;
        this.loading = true;
        this.showNoData = true;
        this.delay = 500;
        this.result = new core_1.EventEmitter();
        this._restful = true;
        this.isNoData = false;
        this.noDataComponent = this._rs._noDataComponent || mn_req_nodata_component_1.MnReqNoDataComponent;
        this.process = 0;
        this.debounceReqHttp = mu.debounce(function (req) {
            mu.run(req, function () {
                _this.ngOnDestroy();
                _this.reqHttp(req);
            });
        }, this.delay);
        this._restful = mu.ifnvl(this._rs._restful, true);
    }
    Object.defineProperty(MnReqHttpComponent.prototype, "data_", {
        set: function (res) {
            var _this = this;
            res = res || {};
            mu.run(this._restful ? res.data : res, function () {
                _this.isNoData = false;
            }, function () {
                _this.isNoData = true;
            });
        },
        enumerable: true,
        configurable: true
    });
    MnReqHttpComponent.prototype.reqHttp = function (req) {
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
            mu.run(_this._restful ? res.data : res, function () {
                _this.isNoData = false;
            }, function () {
                _this.isNoData = true;
            });
            _this.result.emit(res);
        }, function () {
            _this.process = 100;
        }, function () {
            _this.process = 100;
        });
    };
    MnReqHttpComponent.prototype.ngOnChanges = function (changes) {
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
            _this.debounceReqHttp(_this.req);
        });
        mu.run(changes['payload'] && this.req, function () {
            _this.req.payload = _this.payload;
            _this.payload = null;
            _this.debounceReqHttp(_this.req);
        });
        mu.run(changes['req'], function () {
            _this.debounceReqHttp(_this.req);
        });
    };
    MnReqHttpComponent.prototype.ngOnDestroy = function () {
        this._observable && this._observable.unsubscribe();
    };
    MnReqHttpComponent.prototype.processStep = function () {
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
    MnReqHttpComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-req, mn-http',
                    template: "\n        <ng-template [ngIf]=\"loading\">\n            <mn-loader-bar [loader]=\"loader\"\n                           [loaderStyle]=\"loaderStyle\"\n                           [progress]=\"process\"></mn-loader-bar>\n        </ng-template>\n        <ng-container *ngIf=\"showNoData\">\n            <mn-dynamic-component *ngIf=\"isNoData\" [component]=\"noDataComponent\" [inputs]=\"context\"></mn-dynamic-component>\n        </ng-container>\n        <ng-container *ngIf=\"showNoData ? !isNoData : true\">\n            <ng-content></ng-content>\n        </ng-container>\n\n    ",
                    styles: [
                        ":host {\n            display: block;\n            width: 100%;\n            height: 100%;\n        }"
                    ]
                },] },
    ];
    /** @nocollapse */
    MnReqHttpComponent.ctorParameters = function () { return [
        { type: http_1.HttpClient, },
        { type: mn_req_service_1.MnReqServices, },
    ]; };
    MnReqHttpComponent.propDecorators = {
        "req": [{ type: core_1.Input },],
        "params": [{ type: core_1.Input },],
        "payload": [{ type: core_1.Input },],
        "data_": [{ type: core_1.Input },],
        "context": [{ type: core_1.Input },],
        "loader": [{ type: core_1.Input },],
        "loading": [{ type: core_1.Input },],
        "loaderStyle": [{ type: core_1.Input },],
        "showNoData": [{ type: core_1.Input },],
        "delay": [{ type: core_1.Input },],
        "result": [{ type: core_1.Output },],
        "noDataComponent": [{ type: core_1.Input },],
    };
    return MnReqHttpComponent;
}());
exports.MnReqHttpComponent = MnReqHttpComponent;
//# sourceMappingURL=mn-req.component.js.map