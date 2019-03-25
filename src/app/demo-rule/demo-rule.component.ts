import {Component, OnInit} from '@angular/core';
import {MnRuleServices} from '../../lib/mn-rule/mn-rule.services';

import  mu from 'mzmu';

@Component({
    selector: 'mn-demo-rule',
    templateUrl: './demo-rule.component.html',
    styleUrls: ['./demo-rule.component.scss']
})
export class DemoRuleComponent implements OnInit {

    constructor(private _ruleServ: MnRuleServices) {
    }

    rules: any = {};

    ngOnInit() {

        // setInterval(() => {
        //     this.rules['abcdef.hijk'] = !this.rules['abcdef.hijk'];
        //     this._ruleServ.setRules(this.rules);
        // }, 3000);

    }

    show(key) {
        key = 'aaa.bbb.' + key;
        const rules = this._ruleServ.rules_;
        rules[key] = !rules[key];
        this.rules = mu.clone(rules);
    }

}
