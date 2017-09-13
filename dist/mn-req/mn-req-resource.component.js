"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_req_nodata_component_1 = require("./mn-req-nodata.component");
var mu = require("mzmu");
var MnReqResourceComponent = (function () {
    function MnReqResourceComponent() {
        var _this = this;
        // todo
        this.loading = true;
        this.result = new core_1.EventEmitter();
        this.noData = false;
        this.noDataComponent = mn_req_nodata_component_1.MnReqNoDataComponent;
        this.debounce_req_http = mu.debounce(function (req) {
            _this.req_http(req);
        }, 300);
    }
    MnReqResourceComponent.prototype.ngOnInit = function () {
    };
    MnReqResourceComponent.prototype.req_http = function (req) {
        var _this = this;
        var method = req.method || (req.payload ? 'post' : 'get');
        mu.run(mu.prop(this.pool, req.key), function (pool) {
            _this._observable = pool[method](req.params, req.paylaod).subscribe(function (res) {
                if (res === void 0) { res = {}; }
                _this.process = 100;
                mu.run(res.data, function () {
                    _this.result.emit(res);
                }, function () {
                    _this.noData = true;
                });
            });
        }, 
        // fail request
        function () {
            _this.process = 100;
        });
    };
    MnReqResourceComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.process = Math.round(Math.random() * 30);
        mu.run(changes['params'] && this.req, function () {
            _this.req.params = _this.params;
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
    MnReqResourceComponent.prototype.ngOnDestroy = function () {
        mu.run(this._observable, function (_ob) { return _ob.unsubscribe(); });
    };
    return MnReqResourceComponent;
}());
MnReqResourceComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'req-resource',
                template: "\n        <mn-loader-bar *ngIf=\"loading\"\n                       [progress]=\"process\"></mn-loader-bar>\n        <mn-dynamic-component *ngIf=\"noData\" [component]=\"noDataComponent\" [inputs]=\"context\"></mn-dynamic-component>\n        <ng-content *ngIf=\"!noData\"></ng-content>\n    ",
                styles: [
                    ":host {\n            display: block;\n        }"
                ]
            },] },
];
/** @nocollapse */
MnReqResourceComponent.ctorParameters = function () { return []; };
MnReqResourceComponent.propDecorators = {
    'pool': [{ type: core_1.Input },],
    'req': [{ type: core_1.Input },],
    'params': [{ type: core_1.Input },],
    'payload': [{ type: core_1.Input },],
    'context': [{ type: core_1.Input },],
    'loading': [{ type: core_1.Input },],
    'result': [{ type: core_1.Output },],
};
exports.MnReqResourceComponent = MnReqResourceComponent;
//# sourceMappingURL=mn-req-resource.component.js.map