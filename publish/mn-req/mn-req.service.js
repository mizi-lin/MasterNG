"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var MnReqServices = (function () {
    function MnReqServices() {
        this.progress$ = new BehaviorSubject_1.BehaviorSubject({});
    }
    Object.defineProperty(MnReqServices.prototype, "progress", {
        get: function () {
            return this.progress_;
        },
        set: function (value) {
            this.progress_ = value;
            this.progress$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    MnReqServices.prototype.setHeaders = function (headers) {
        this._headers = headers;
    };
    MnReqServices.prototype.getHeaders = function (fn) {
        return fn ? fn(this._headers) : this._headers;
    };
    MnReqServices.prototype.setResources = function (resources) {
        this._resources = resources;
    };
    MnReqServices.prototype.getResources = function (fn) {
        return fn ? fn(this._resources) : this._resources;
    };
    MnReqServices.prototype.setNoDataComponent = function (component) {
        this._noDataComponent = component;
    };
    MnReqServices.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnReqServices.ctorParameters = function () { return []; };
    return MnReqServices;
}());
exports.MnReqServices = MnReqServices;
//# sourceMappingURL=mn-req.service.js.map