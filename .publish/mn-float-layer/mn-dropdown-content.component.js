"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnDropdownContentComponent = (function () {
    function MnDropdownContentComponent(_ref, _render) {
        this._ref = _ref;
        this._render = _render;
    }
    MnDropdownContentComponent.prototype.ngOnInit = function () {
    };
    MnDropdownContentComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-dropdown-content',
                    template: "\n        <ng-content></ng-content>\n    ",
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    MnDropdownContentComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer2, },
    ]; };
    return MnDropdownContentComponent;
}());
exports.MnDropdownContentComponent = MnDropdownContentComponent;
//# sourceMappingURL=mn-dropdown-content.component.js.map