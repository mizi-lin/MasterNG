"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_panel_component_1 = require("./mn-panel.component");
var ToolRefreshComponent = (function () {
    function ToolRefreshComponent(_ref, _renderer, 
        // -> 父级 component
        // @Host() private _panel: PanelComponent
        // -> 祖踪 component
        _panel) {
        this._ref = _ref;
        this._renderer = _renderer;
        this._panel = _panel;
        this.fsClick = new core_1.EventEmitter();
    }
    ToolRefreshComponent.prototype._click = function ($event) {
        this.fsClick.emit($event);
    };
    ToolRefreshComponent.prototype.ngOnInit = function () {
    };
    return ToolRefreshComponent;
}());
ToolRefreshComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tool-refresh',
                template: "\n        <i class=\"fa fa-refresh\" aria-hidden=\"true\" (click)=\"_click($event)\" ></i>\n    ",
                styles: [
                    "\n            \n        "
                ]
            },] },
];
/** @nocollapse */
ToolRefreshComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return mn_panel_component_1.MnPanelComponent; }),] },] },
]; };
ToolRefreshComponent.propDecorators = {
    'fsClick': [{ type: core_1.Output },],
};
exports.ToolRefreshComponent = ToolRefreshComponent;
//# sourceMappingURL=tool-refresh.component.js.map