"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnPanelBottomComponent = (function () {
    function MnPanelBottomComponent(_ref, _renderer) {
        this._ref = _ref;
        this._renderer = _renderer;
    }
    MnPanelBottomComponent.prototype.ngOnInit = function () {
    };
    return MnPanelBottomComponent;
}());
MnPanelBottomComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-panel-bottom',
                template: "\n        <ng-content></ng-content>\n    ",
                styles: [
                    "\n            \n        "
                ]
            },] },
];
/** @nocollapse */
MnPanelBottomComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
exports.MnPanelBottomComponent = MnPanelBottomComponent;
//# sourceMappingURL=mn-panel-bottom.component.js.map