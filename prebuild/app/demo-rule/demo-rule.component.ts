import { Component, OnInit } from '@angular/core';
import {MnRuleServices} from '../../lib/mn-rule/mn-rule.services';
declare const mu: any;

@Component({
  selector: 'mn-demo-rule',
  template: '<div class="p-16">     <mn-panel-s class="bordered" [title]="\'Rule 规则匹配\'">         <mn-fill [gutter]="16" [style.height.px]="200">              <ng-template [rule]="\'aaa.bbb.ccc\'" [rules]="rules">                 <mn-col [span]="1">                     <div class="bordered hp-100">                         CCC                     </div>                 </mn-col>             </ng-template>              <ng-template [rule]="\'aaa.bbb.ddd\'" [rules]="rules">                 <mn-col [span]="2">                     <div class="bordered hp-100">                         DDD                     </div>                 </mn-col>             </ng-template>              <ng-template [rule]="\'aaa.bbb.eee\'" [rules]="rules">                 <mn-col [span]="3">                     <div class="bordered hp-100">                         EEE                     </div>                 </mn-col>             </ng-template>              <mn-col [span]="4" *rule="\'aaa.bbb.fff\'">                 <div class="bordered hp-100">                     FFF                 </div>             </mn-col>         </mn-fill>          <div class="mt-8">             <button mn-btn (click)="show(\'ccc\')">CCC</button>             <button mn-btn (click)="show(\'ddd\')">DDD</button>             <button mn-btn (click)="show(\'eee\')">EEE</button>             <button mn-btn (click)="show(\'fff\')">FFF(no work is no change rules)</button>         </div>     </mn-panel-s> </div>',
  styles: ['']
})
export class DemoRuleComponent implements OnInit {

  constructor(private _ruleServ: MnRuleServices) { }

  rules: any;

  ngOnInit() {
  }

  show(key) {
      key = 'aaa.bbb.' + key;
      const rules = this._ruleServ.rules_;
      rules[key] = !rules[key];
      this.rules = mu.clone(rules);
  }

}
