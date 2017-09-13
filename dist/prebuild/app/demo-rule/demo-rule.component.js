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
                template: '<div class="p-16">     <mn-panel-s class="bordered" [title]="\'Rule 规则匹配\'">         <mn-fill [gutter]="16" [style.height.px]="200">              <ng-template [rule]="\'aaa.bbb.ccc\'" [rules]="rules">                 <mn-col [span]="1">                     <div class="bordered hp-100">                         CCC                     </div>                 </mn-col>             </ng-template>              <ng-template [rule]="\'aaa.bbb.ddd\'" [rules]="rules">                 <mn-col [span]="2">                     <div class="bordered hp-100">                         DDD                     </div>                 </mn-col>             </ng-template>              <ng-template [rule]="\'aaa.bbb.eee\'" [rules]="rules">                 <mn-col [span]="3">                     <div class="bordered hp-100">                         EEE                     </div>                 </mn-col>             </ng-template>              <mn-col [span]="4" *rule="\'aaa.bbb.fff\'">                 <div class="bordered hp-100">                     FFF                 </div>             </mn-col>         </mn-fill>          <div class="mt-8">             <button mn-btn (click)="show(\'ccc\')">CCC</button>             <button mn-btn (click)="show(\'ddd\')">DDD</button>             <button mn-btn (click)="show(\'eee\')">EEE</button>             <button mn-btn (click)="show(\'fff\')">FFF(no work is no change rules)</button>         </div>     </mn-panel-s> </div>',
                styles: ['']
            },] },
];
/** @nocollapse */
DemoRuleComponent.ctorParameters = function () { return [
    { type: mn_rule_services_1.MnRuleServices, },
]; };
exports.DemoRuleComponent = DemoRuleComponent;
//# sourceMappingURL=demo-rule.component.js.map