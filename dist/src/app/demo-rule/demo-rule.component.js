"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_rule_services_1 = require("../../lib/mn-rule/mn-rule.services");
var DemoRuleComponent = (function () {
    function DemoRuleComponent(_ruleServ) {
        this._ruleServ = _ruleServ;
    }
    DemoRuleComponent.prototype.ngOnInit = function () {
    };
    DemoRuleComponent.prototype.show = function (key) {
        key = 'aaa.bbb.' + key;
        var rules = this._ruleServ.rules_;
        rules[key] = !rules[key];
        this.rules = mu.clone(rules);
    };
    return DemoRuleComponent;
}());
DemoRuleComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-demo-rule',
                templateUrl: './demo-rule.component.html',
                styleUrls: ['./demo-rule.component.scss']
            },] },
];
/** @nocollapse */
DemoRuleComponent.ctorParameters = function () { return [
    { type: mn_rule_services_1.MnRuleServices, },
]; };
exports.DemoRuleComponent = DemoRuleComponent;
//# sourceMappingURL=demo-rule.component.js.map