import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MnRuleServices {
    rules$: any = new BehaviorSubject<any>({});

    rules_: any;

    setRules(rules: any) {
        this.rules$.next(rules);
        this.rules_ = rules;
    }

    constructor() {
    }
}
