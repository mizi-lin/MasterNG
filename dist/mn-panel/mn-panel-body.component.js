"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnPanelBodyComponent = (function () {
    function MnPanelBodyComponent(_ref, _renderer) {
        this._ref = _ref;
        this._renderer = _renderer;
    }
    MnPanelBodyComponent.prototype.ngOnInit = function () {
    };
    return MnPanelBodyComponent;
}());
MnPanelBodyComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-panel-body',
                template: "\n        <ng-content></ng-content>\n    ",
                styles: [
                    ":host {\n            display: block;\n            width: 100%;\n            height: calc(100% - 42px);\n        }"
                ]
            },] },
];
/** @nocollapse */
MnPanelBodyComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
exports.MnPanelBodyComponent = MnPanelBodyComponent;
//# sourceMappingURL=mn-panel-body.component.js.map