"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_panel_component_1 = require("./mn-panel.component");
var MnPanelHeaderComponent = (function () {
    function MnPanelHeaderComponent(_ref, _renderer, _panel) {
        this._ref = _ref;
        this._renderer = _renderer;
        this._panel = _panel;
    }
    MnPanelHeaderComponent.prototype.ngOnInit = function () {
    };
    return MnPanelHeaderComponent;
}());
MnPanelHeaderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-panel-header',
                template: "\n        <ng-content></ng-content>\n    ",
                styles: [
                    "\n            :host {\n                display: flex;\n                flex-wrap: wrap;\n                align-items: stretch;\n                box-sizing: border-box;\n            }\n        "
                ]
            },] },
];
/** @nocollapse */
MnPanelHeaderComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return mn_panel_component_1.MnPanelComponent; }),] },] },
]; };
exports.MnPanelHeaderComponent = MnPanelHeaderComponent;
//# sourceMappingURL=mn-panel-header.component.js.map