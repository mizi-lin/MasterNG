import {
    Directive, Input, TemplateRef, EmbeddedViewRef, ViewContainerRef, Output, EventEmitter, DoCheck, OnChanges, SimpleChanges
} from '@angular/core';
import {MnRuleServices} from './mn-rule.services';

declare const mu: any, window: any;

export class AuthRuleContext {
    public $implicit: any = null;
    public rule: any = null;
}

@Directive({selector: '[rule]'})
export class MnRuleDirective implements OnChanges {
    private _context: AuthRuleContext = new AuthRuleContext();
    private _elseTemplateRef: TemplateRef<AuthRuleContext>;
    private _elseViewRef: EmbeddedViewRef<AuthRuleContext>;
    private _viewRef: EmbeddedViewRef<AuthRuleContext>;
    private _rules: any;
    private _conditions: any;

    /**
     * 返回rule验证结果
     * @type {EventEmitter<any>}
     */
    @Output() result: EventEmitter<any> = new EventEmitter<any>();

    /**
     * 获取权限判断池
     */
    @Input() rules: any;

    @Input()
    set rule(conditions: any) {

        this._conditions = conditions;

        let bool: boolean = true;
        let condition_: any;

        switch (mu.type(conditions)) {
            case 'boolean':
                bool = conditions;
                break;
            case 'string':
                bool = this._calc(conditions);
                break;
            case 'array':
                /**
                 * 解构传入数组权限key
                 * condition = ['a.b.key', 'a.b.c:key1']
                 * condition_ = {
                 *    key: 'a.b.key',
                 *    key1: 'a.b.c'
                 * }
                 */
                // console.debug(condition);
                condition_ = {};

                conditions = mu.map(conditions, (condition) => {
                    const [val, key] = (condition || '').split(':');
                    const key_ = key || mu.run(val.split('.'), (vs) => {
                        return vs[vs.length - 1];
                    });
                    condition_[key_] = val;
                    return val;
                });

                bool = this._calc(conditions.join('||'));

                // console.debug('oooOooooOooo', bool, condition.join('||'));

                break;
            case 'object':
                bool = this._calc(mu.map(conditions, (val) => val, []).join('||'));
                break;
            default:
                bool = true;
        }

        // console.debug('ooOOoooOOoo', condition, bool);

        this.result.emit(condition_ || conditions);
        this._context.$implicit = this._context.rule = bool;
        this._updateView();
    }

    @Input()
    set rule4Else(templateRef: TemplateRef<AuthRuleContext>) {
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null;
        this._updateView();
    }

    constructor(private _ruleServ: MnRuleServices,
                private _vcRef: ViewContainerRef,
                private _tempRef: TemplateRef<AuthRuleContext>) {
        mu.empty(this.rules, () => {
            this._rules = this._ruleServ.rules_;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.run(mu.prop(changes, 'rules.currentValue'), (rules) => {
            this._rules = rules;
            this.rule = this._conditions;
        });
    }

    /**
     * 计算复合规则最终结果
     * @param {string} rules
     * @return {boolean | any}
     * @private
     */
    private _calc(rules: string): any | boolean {
        let _rules: any[] = rules.split(/(\&\&|\|\||\(|\))/g).filter(Boolean);
        _rules = mu.map(_rules, (key) => {
            if (key !== '&&' && key !== '||' && key !== '(' && key !== ')') {
                return this._result(key);
            } else {
                return key;
            }
        });

        const rst = _rules.join(' ');

        try {
            return window.eval(rst);
        } catch (e) {
            return new TypeError(`rule:::${rst} is wrong`);
        }
    }

    /**
     * 获得单一规则的结果
     * @param {string} condition
     * @return {boolean}
     * @private
     */
    private _result(condition: string): boolean {
        condition = mu.trim(condition);
        return mu.or(condition, 'true', 'false') ? window.eval(condition) : !!mu.ifnvl(this._rules[condition], true);
    }

    /**
     * 更新模板
     * @private
     */
    private _updateView(): void {
        if (this._context.$implicit) {
            if (!this._viewRef) {
                this._vcRef.clear();
                this._elseViewRef = null;
                if (this._tempRef) {
                    this._viewRef = this._vcRef.createEmbeddedView(this._tempRef, this._context);
                }
            }
        } else {
            if (this._elseViewRef) {
                return;
            }

            this._vcRef.clear();
            this._viewRef = null;
            if (this._elseTemplateRef) {
                this._elseViewRef = this._vcRef.createEmbeddedView(this._elseTemplateRef, this._context);
            }
        }
    }

}
