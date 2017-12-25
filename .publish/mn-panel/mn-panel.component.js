"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_panel_body_component_1 = require("./mn-panel-body.component");
var MnPanelComponent = (function () {
    function MnPanelComponent(_ref, _renderer) {
        this._ref = _ref;
        this._renderer = _renderer;
        // 让控件支持高度100%
        // height percent hundred
        this.hph = true;
        // @ContentChildren(MnPanelBodyComponent, {descendants: true}) ss: any;
        // @ContentChild(forwardRef(() => MnPanelBodyComponent)) children: any;
        // @ViewChild(MnPanelBodyComponent) ss: any;
        this.isCollapse = true;
        this.isChanges = false;
    }
    Object.defineProperty(MnPanelComponent.prototype, "getHph", {
        get: function () {
            return this.hph === true ? '100%' : this.hph === false ? 'auto' : this.hph;
        },
        enumerable: true,
        configurable: true
    });
    MnPanelComponent.prototype.toggle_collapse = function (state) {
        var _this = this;
        mu.exist(state, function () {
            _this.isCollapse = state;
        });
        mu.run(this.panelBody, function (cmp) {
            _this.isCollapse
                ? cmp._renderer.setStyle(cmp._ref.nativeElement, 'display', 'block')
                : cmp._renderer.setStyle(cmp._ref.nativeElement, 'display', 'none');
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
    MnPanelComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-panel',
                    template: "\n        <ng-content></ng-content>\n    ",
                    styles: [':host {  display: block;  width: 100%;}:host.class_collapse_up::ng-deep mn-panel-body {  display: none;}:host.class_collapse_drop::ng-deep mn-panel-body {  display: block;}']
                },] },
    ];
    /** @nocollapse */
    MnPanelComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer2, },
    ]; };
    MnPanelComponent.propDecorators = {
        "panelBody": [{ type: core_1.ContentChild, args: [mn_panel_body_component_1.MnPanelBodyComponent,] },],
        "hph": [{ type: core_1.Input },],
        "getHph": [{ type: core_1.HostBinding, args: ['style.height',] },],
        "collapse": [{ type: core_1.Input },],
        "class_collapse_up": [{ type: core_1.HostBinding, args: ['class.collapse-up',] },],
        "class_collapse_drop": [{ type: core_1.HostBinding, args: ['class.collapse-drop',] },],
    };
    return MnPanelComponent;
}());
exports.MnPanelComponent = MnPanelComponent;
//# sourceMappingURL=mn-panel.component.js.map