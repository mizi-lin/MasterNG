import { Component, OnInit } from '@angular/core';
import {MnRuleServices} from '../../lib/mn-rule/mn-rule.services';

@Component({
  selector: 'mn-demo-rule',
  templateUrl: './demo-rule.component.html',
  styleUrls: ['./demo-rule.component.scss']
})
export class DemoRuleComponent implements OnInit {

  constructor(private _ruleServ: MnRuleServices) { }

  ngOnInit() {
  }

  show(key) {
      key = 'aaa.bbb.' + key;
      const rules = this._ruleServ.rules_;
      rules[key] = !rules[key];
      this._ruleServ.setRules(rules);

      console.debug(this._ruleServ.rules_);
  }

}
