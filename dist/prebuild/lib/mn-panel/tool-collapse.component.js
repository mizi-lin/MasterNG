"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var mn_panel_component_1 = require("./mn-panel.component");
var ToolCollapseDownComponent = (function () {
    function ToolCollapseDownComponent(_ref, _renderer, 
        // -> 父级 component
        // @Host() private _panel: PanelComponent
        // -> 祖踪 component
        _panel) {
        this._ref = _ref;
        this._renderer = _renderer;
        this._panel = _panel;
        this.fsClick = new core_1.EventEmitter();
    }
    ToolCollapseDownComponent.prototype.onClick = function (event) {
        var _this = this;
        mu.run(this._panel, function (o) {
            o.toggle_collapse();
            _this.fsClick.emit(true);
        });
    };
    ToolCollapseDownComponent.prototype.ngOnInit = function () {
    };
    return ToolCollapseDownComponent;
}());
ToolCollapseDownComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tool-collapse-down',
                template: "\n        <i class=\"fa fa-chevron-down\" aria-hidden=\"true\" *ngIf=\"this._panel.isCollapse\"></i>\n    "
            },] },
];
/** @nocollapse */
ToolCollapseDownComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return mn_panel_component_1.MnPanelComponent; }),] },] },
]; };
ToolCollapseDownComponent.propDecorators = {
    'onClick': [{ type: core_1.HostListener, args: ['click',] },],
    'fsClick': [{ type: core_1.Output },],
};
exports.ToolCollapseDownComponent = ToolCollapseDownComponent;
var ToolCollapseUpComponent = (function () {
    function ToolCollapseUpComponent(_ref, _renderer, 
        // -> 父级 component
        // @Host() private _panel: PanelComponent
        // -> 祖踪 component
        _panel) {
        this._ref = _ref;
        this._renderer = _renderer;
        this._panel = _panel;
        this.fsClick = new core_1.EventEmitter();
    }
    ToolCollapseUpComponent.prototype.onClick = function (event) {
        var _this = this;
        mu.run(this._panel, function (o) {
            o.toggle_collapse();
            _this.fsClick.emit(true);
        });
    };
    ToolCollapseUpComponent.prototype.ngOnInit = function () {
    };
    return ToolCollapseUpComponent;
}());
ToolCollapseUpComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tool-collapse-up',
                template: "\n        <i class=\"fa fa-chevron-up\" aria-hidden=\"true\" *ngIf=\"!this._panel.isCollapse\"></i>\n    "
            },] },
];
/** @nocollapse */
ToolCollapseUpComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return mn_panel_component_1.MnPanelComponent; }),] },] },
]; };
ToolCollapseUpComponent.propDecorators = {
    'onClick': [{ type: core_1.HostListener, args: ['click',] },],
    'fsClick': [{ type: core_1.Output },],
};
exports.ToolCollapseUpComponent = ToolCollapseUpComponent;
//# sourceMappingURL=tool-collapse.component.js.map