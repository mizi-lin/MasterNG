"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_rule_services_1 = require("./mn-rule.services");
var mn_rule_directive_1 = require("./mn-rule.directive");
var MnRuleModule = (function () {
    function MnRuleModule() {
    }
    MnRuleModule.forRoot = function () {
        return {
            ngModule: MnRuleModule
        };
    };
    return MnRuleModule;
}());
MnRuleModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule
                ],
                declarations: [
                    mn_rule_directive_1.MnRuleDirective
                ],
                exports: [
                    mn_rule_directive_1.MnRuleDirective
                ],
                providers: [
                    mn_rule_services_1.MnRuleServices
                ]
            },] },
];
/** @nocollapse */
MnRuleModule.ctorParameters = function () { return []; };
exports.MnRuleModule = MnRuleModule;
//# sourceMappingURL=mn-rule.module.js.map