import {
    Directive, Input, TemplateRef, EmbeddedViewRef, ViewContainerRef, Output, EventEmitter, DoCheck
} from '@angular/core';
import {MnRuleServices} from './mn-rule.services';

declare const mu: any, window: any;

class AuthRuleContext {
    public $implicit: any = null;
    public rule: any = null;
}

@Directive({selector: '[rule]'})
export class MnRuleDirective implements DoCheck {
    private context: AuthRuleContext = new AuthRuleContext();
    private elseTemplateRef: TemplateRef<AuthRuleContext>;
    private elseViewRef: EmbeddedViewRef<AuthRuleContext>;
    private viewRef: EmbeddedViewRef<AuthRuleContext>;
    private _rules: any = {};

    @Output() rules: EventEmitter<any> = new EventEmitter<any>();

    private _rules: any;

    constructor(private _ruleServ: MnRuleServices,
                private _vcRef: ViewContainerRef,
                private _tempRef: TemplateRef<AuthRuleContext>) {
        this._rules = this._ruleServ.rules_;
    }

    private _conditions: any;

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

        this.rules.emit(condition_ || conditions);
        this.context.$implicit = this.context.rule = bool;
        this._updateView();
    }

    @Input()
    set rule4Else(templateRef: TemplateRef<AuthRuleContext>) {
        this.elseTemplateRef = templateRef;
        this.elseViewRef = null;
        this._updateView();
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
        if (this.context.$implicit) {
            if (!this.viewRef) {
                this._vcRef.clear();
                this.elseViewRef = null;
                if (this._tempRef) {
                    this.viewRef = this._vcRef.createEmbeddedView(this._tempRef, this.context);
                }
            }
        } else {
            if (this.elseViewRef) {
                return;
            }

            this._vcRef.clear();
            this.viewRef = null;
            if (this.elseTemplateRef) {
                this.elseViewRef = this._vcRef.createEmbeddedView(this.elseTemplateRef, this.context);
            }
        }
    }

    ngDoCheck() {
        this.rule = this._conditions;
    }

}
