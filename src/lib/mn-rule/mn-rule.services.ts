import {Injectable} from '@angular/core';

@Injectable()
export class MnRuleServices {

    rules_: any;

    setRules(rules: any) {
        this.rules_ = rules;
    }

    constructor() {
    }
}
