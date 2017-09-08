"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_panel_component_1 = require("./mn-panel.component");
var MnPanelTitleComponent = (function () {
    function MnPanelTitleComponent(_ref, _renderer, _panel) {
        this._ref = _ref;
        this._renderer = _renderer;
        this._panel = _panel;
    }
    MnPanelTitleComponent.prototype.onClick = function (event) {
        if (this._panel.collapse) {
            this._panel.toggle_collapse();
        }
    };
    MnPanelTitleComponent.prototype.ngOnInit = function () {
    };
    return MnPanelTitleComponent;
}());
MnPanelTitleComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-panel-title',
                template: "\n        <ng-content></ng-content>\n    ",
                styles: [
                    "\n        "
                ]
            },] },
];
/** @nocollapse */
MnPanelTitleComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return mn_panel_component_1.MnPanelComponent; }),] },] },
]; };
MnPanelTitleComponent.propDecorators = {
    'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
};
exports.MnPanelTitleComponent = MnPanelTitleComponent;
//# sourceMappingURL=mn-panel-title.component.js.map