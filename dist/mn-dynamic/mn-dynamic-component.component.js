"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var mn_dynamic_component_service_1 = require("./mn-dynamic-component.service");
/**
 * mn-dynamic-component
 * 动态加载Component
 *
 * 1. 动态加载的Component必须在ngModule中在enterComponent在声明
 *
 * @NgModule({
 *    entryComponents: [
 *       DynamicSample1Component
 *    ]
 * })
 *
 * 2. 需要动态加载的Component, 若需要预传值, 则需要继承 DynamicComponent
 * export class DynamicSample1Component extends DynamicComponents {
 *      ...
 * }
 *
 * 3. 预传值为 context: any
 *
 */
var MnDynamicComponentComponent = (function () {
    function MnDynamicComponentComponent(// private _vcRef: ViewContainerRef,
        _cfr, _serv) {
        this._cfr = _cfr;
        this._serv = _serv;
        this.outevt = new core_1.EventEmitter();
    }
    MnDynamicComponentComponent.prototype.create = function (component, inputs, outputs) {
        this.ngOnDestroy();
        if (!component) {
            component = MnUnknownDynamicComponent;
        }
        var factory = this._cfr.resolveComponentFactory(component);
        this.componentRef = this._vcRef.createComponent(factory);
        this.instance = this.componentRef.instance;
        this.setInputs(inputs);
        this.setOutputs(outputs);
    };
    /**
     * 模拟传递
     * @param inputs
     */
    MnDynamicComponentComponent.prototype.setInputs = function (inputs) {
        var _this = this;
        mu.each(inputs, function (v, k) {
            _this.instance[k] = v;
        });
    };
    /**
     * 模拟传递
     * @param outputs
     */
    MnDynamicComponentComponent.prototype.setOutputs = function (outputs) {
        var _this = this;
        mu.each(outputs, function (fn) {
            _this.instance[fn] && _this.instance[fn].subscribe(function (event) {
                _this.outevt.emit({
                    fn: fn,
                    event: event
                });
            });
        });
    };
    MnDynamicComponentComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.exist(changes['component'], function () {
            if (typeof _this.component === 'string') {
                _this.dynamicComponent = _this._serv.getComponent(_this.component);
            }
            else {
                _this.dynamicComponent = _this.component;
            }
            _this.create(_this.dynamicComponent, _this.inputs, _this.outputs);
        });
        // console.debug(changes);
        /**
         * 模拟 ngOnChanges
         */
        mu.exist(changes['inputs'], function () {
            if (_this.dynamicComponent && _this.instance) {
                _this.setInputs(_this.inputs);
                _this.instance.ngOnChanges && _this.instance.ngOnChanges(mu.map(_this.inputs, function (v, k) {
                    return {
                        currentValue: v
                    };
                }));
            }
        });
    };
    MnDynamicComponentComponent.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    };
    return MnDynamicComponentComponent;
}());
MnDynamicComponentComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-dynamic-component',
                template: "\n        <ng-template #container></ng-template>\n    "
            },] },
];
/** @nocollapse */
MnDynamicComponentComponent.ctorParameters = function () { return [
    { type: core_1.ComponentFactoryResolver, },
    { type: mn_dynamic_component_service_1.MnDynamicServices, },
]; };
MnDynamicComponentComponent.propDecorators = {
    '_vcRef': [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] },],
    'inputs': [{ type: core_1.Input },],
    'outputs': [{ type: core_1.Input },],
    'component': [{ type: core_1.Input },],
    'outevt': [{ type: core_1.Output },],
};
exports.MnDynamicComponentComponent = MnDynamicComponentComponent;
/**
 * Base Dynamic Component
 * 注值
 */
var DynamicComponent = (function () {
    function DynamicComponent() {
    }
    return DynamicComponent;
}());
exports.DynamicComponent = DynamicComponent;
/**
 * unknown component
 */
var MnUnknownDynamicComponent = (function (_super) {
    __extends(MnUnknownDynamicComponent, _super);
    function MnUnknownDynamicComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MnUnknownDynamicComponent;
}(DynamicComponent));
MnUnknownDynamicComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-unknown-component',
                template: "\n        <div title=\"unknown-component\">unknown-component</div>"
            },] },
];
/** @nocollapse */
MnUnknownDynamicComponent.ctorParameters = function () { return []; };
exports.MnUnknownDynamicComponent = MnUnknownDynamicComponent;
//# sourceMappingURL=mn-dynamic-component.component.js.map