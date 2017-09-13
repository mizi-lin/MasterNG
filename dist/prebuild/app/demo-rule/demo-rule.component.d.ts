import { OnInit } from '@angular/core';
import { MnRuleServices } from '../../lib/mn-rule/mn-rule.services';
export declare class DemoRuleComponent implements OnInit {
    private _ruleServ;
    constructor(_ruleServ: MnRuleServices);
    rules: any;
    ngOnInit(): void;
    show(key: any): void;
}
