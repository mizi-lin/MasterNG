"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_rule_services_1 = require("./mn-rule.services");
var AuthRuleContext = (function () {
    function AuthRuleContext() {
        this.$implicit = null;
        this.rule = null;
    }
    return AuthRuleContext;
}());
exports.AuthRuleContext = AuthRuleContext;
var MnRuleDirective = (function () {
    function MnRuleDirective(_ruleServ, _vcRef, _tempRef) {
        var _this = this;
        this._ruleServ = _ruleServ;
        this._vcRef = _vcRef;
        this._tempRef = _tempRef;
        this._context = new AuthRuleContext();
        this._conditions = {};
        /**
         * 返回rule验证结果
         * @type {EventEmitter<any>}
         */
        this.result = new core_1.EventEmitter();
        mu.empty(this.rules, function () {
            _this._rules = _this._ruleServ.rules_;
        });
    }
    Object.defineProperty(MnRuleDirective.prototype, "rule", {
        set: function (conditions) {
            this._conditions = conditions || {};
            var bool = true;
            var condition_;
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
                    conditions = mu.map(conditions, function (condition) {
                        var _a = (condition || '').split(':'), val = _a[0], key = _a[1];
                        var key_ = key || mu.run(val.split('.'), function (vs) {
                            return vs[vs.length - 1];
                        });
                        condition_[key_] = val;
                        return val;
                    });
                    bool = this._calc(conditions.join('||'));
                    // console.debug('oooOooooOooo', bool, condition.join('||'));
                    break;
                case 'object':
                    bool = this._calc(mu.map(conditions, function (val) { return val; }, []).join('||'));
                    break;
                default:
                    bool = true;
            }
            // console.debug('ooOOoooOOoo', condition, bool);
            this.result.emit(condition_ || conditions);
            this._context.$implicit = this._context.rule = bool;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnRuleDirective.prototype, "rule4Else", {
        set: function (templateRef) {
            this._elseTemplateRef = templateRef;
            this._elseViewRef = null;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    MnRuleDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(mu.prop(changes, 'rules.currentValue'), function (rules) {
            _this._rules = rules;
            _this.rule = _this._conditions;
        });
    };
    /**
     * 计算复合规则最终结果
     * @param {string} rules
     * @return {boolean | any}
     * @private
     */
    MnRuleDirective.prototype._calc = function (rules) {
        var _this = this;
        var _rules = rules.split(/(\&\&|\|\||\(|\))/g).filter(Boolean);
        _rules = mu.map(_rules, function (key) {
            if (key !== '&&' && key !== '||' && key !== '(' && key !== ')') {
                return _this._result(key);
            }
            else {
                return key;
            }
        });
        var rst = _rules.join(' ');
        try {
            return window.eval(rst);
        }
        catch (e) {
            return new TypeError("rule:::" + rst + " is wrong");
        }
    };
    /**
     * 获得单一规则的结果
     * @param {string} condition
     * @return {boolean}
     * @private
     */
    MnRuleDirective.prototype._result = function (condition) {
        condition = mu.trim(condition);
        return mu.or(condition, 'true', 'false') ? window.eval(condition) : !!mu.ifnvl(this._rules[condition], true);
    };
    /**
     * 更新模板
     * @private
     */
    MnRuleDirective.prototype._updateView = function () {
        if (this._context.$implicit) {
            if (!this._viewRef) {
                this._vcRef.clear();
                this._elseViewRef = null;
                if (this._tempRef) {
                    this._viewRef = this._vcRef.createEmbeddedView(this._tempRef, this._context);
                }
            }
        }
        else {
            if (this._elseViewRef) {
                return;
            }
            this._vcRef.clear();
            this._viewRef = null;
            if (this._elseTemplateRef) {
                this._elseViewRef = this._vcRef.createEmbeddedView(this._elseTemplateRef, this._context);
            }
        }
    };
    return MnRuleDirective;
}());
MnRuleDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: '[rule]' },] },
];
/** @nocollapse */
MnRuleDirective.ctorParameters = function () { return [
    { type: mn_rule_services_1.MnRuleServices, },
    { type: core_1.ViewContainerRef, },
    { type: core_1.TemplateRef, },
]; };
MnRuleDirective.propDecorators = {
    'result': [{ type: core_1.Output },],
    'rules': [{ type: core_1.Input },],
    'rule': [{ type: core_1.Input },],
    'rule4Else': [{ type: core_1.Input },],
};
exports.MnRuleDirective = MnRuleDirective;
//# sourceMappingURL=mn-rule.directive.js.map