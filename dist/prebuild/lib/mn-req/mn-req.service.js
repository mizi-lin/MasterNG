"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var MnReqService = (function () {
    function MnReqService() {
        this.progress$ = new BehaviorSubject_1.BehaviorSubject({});
    }
    Object.defineProperty(MnReqService.prototype, "progress", {
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
    return MnReqService;
}());
MnReqService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnReqService.ctorParameters = function () { return []; };
exports.MnReqService = MnReqService;
//# sourceMappingURL=mn-req.service.js.map