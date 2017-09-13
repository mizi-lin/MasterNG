import { TemplateRef, ViewContainerRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MnRuleServices } from './mn-rule.services';
export declare class AuthRuleContext {
    $implicit: any;
    rule: any;
}
export declare class MnRuleDirective implements OnChanges {
    private _ruleServ;
    private _vcRef;
    private _tempRef;
    private _context;
    private _elseTemplateRef;
    private _elseViewRef;
    private _viewRef;
    private _rules;
    private _conditions;
    /**
     * 返回rule验证结果
     * @type {EventEmitter<any>}
     */
    result: EventEmitter<any>;
    /**
     * 获取权限判断池
     */
    rules: any;
    rule: any;
    rule4Else: TemplateRef<AuthRuleContext>;
    constructor(_ruleServ: MnRuleServices, _vcRef: ViewContainerRef, _tempRef: TemplateRef<AuthRuleContext>);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * 计算复合规则最终结果
     * @param {string} rules
     * @return {boolean | any}
     * @private
     */
    private _calc(rules);
    /**
     * 获得单一规则的结果
     * @param {string} condition
     * @return {boolean}
     * @private
     */
    private _result(condition);
    /**
     * 更新模板
     * @private
     */
    private _updateView();
}
