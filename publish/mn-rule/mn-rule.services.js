"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var MnRuleServices = (function () {
    function MnRuleServices() {
        this.rules$ = new BehaviorSubject_1.BehaviorSubject({});
    }
    MnRuleServices.prototype.setRules = function (rules) {
        this.rules$.next(rules);
        this.rules_ = rules;
    };
    MnRuleServices.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnRuleServices.ctorParameters = function () { return []; };
    return MnRuleServices;
}());
exports.MnRuleServices = MnRuleServices;
//# sourceMappingURL=mn-rule.services.js.map