"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_panel_body_component_1 = require("./mn-panel-body.component");
var MnPanelComponent = (function () {
    function MnPanelComponent(_ref, _renderer) {
        this._ref = _ref;
        this._renderer = _renderer;
        // @ContentChildren(MnPanelBodyComponent, {descendants: true}) ss: any;
        // @ContentChild(forwardRef(() => MnPanelBodyComponent)) children: any;
        // @ViewChild(MnPanelBodyComponent) ss: any;
        this.isCollapse = true;
        this.isChanges = false;
    }
    MnPanelComponent.prototype.toggle_collapse = function (state) {
        var _this = this;
        mu.exist(state, function () {
            _this.isCollapse = state;
        });
        mu.run(this.panelBody, function (cmp) {
            _this.isCollapse
                ? cmp._renderer.setAttribute(cmp._ref.nativeElement, 'hidden')
                : cmp._renderer.removeAttribute(cmp._ref.nativeElement, 'hidden');
            _this.isCollapse = !_this.isCollapse;
            _this.class_collapse_drop = _this.isCollapse;
            _this.class_collapse_up = !_this.isCollapse;
        });
    };
    MnPanelComponent.prototype._ngChanges = function () {
        this.isChanges = true;
        this.isCollapse = this.collapse === 'up';
        this.toggle_collapse();
    };
    MnPanelComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        // 默认展开
        mu.exist(changes['collapse'], function () {
            _this._ngChanges();
        });
    };
    MnPanelComponent.prototype.ngAfterContentChecked = function () {
        if (!this.isChanges && this.collapse) {
            this._ngChanges();
        }
    };
    return MnPanelComponent;
}());
MnPanelComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-panel',
                template: "\n        <ng-content></ng-content>\n    ",
                styles: [
                    "\n            :host {\n                height: 100%;\n                width: 100%;\n            }\n            "
                ]
            },] },
];
/** @nocollapse */
MnPanelComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
MnPanelComponent.propDecorators = {
    'panelBody': [{ type: core_1.ContentChild, args: [mn_panel_body_component_1.MnPanelBodyComponent,] },],
    'where': [{ type: core_1.Input },],
    'collapse': [{ type: core_1.Input },],
    'class_collapse_up': [{ type: core_1.HostBinding, args: ['class.collapse-up',] },],
    'class_collapse_drop': [{ type: core_1.HostBinding, args: ['class.collapse-drop',] },],
};
exports.MnPanelComponent = MnPanelComponent;
//# sourceMappingURL=mn-panel.component.js.map