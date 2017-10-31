"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnDropdownComponent = (function () {
    function MnDropdownComponent(_ref) {
        this._ref = _ref;
    }
    MnDropdownComponent.prototype.ngOnInit = function () {
    };
    return MnDropdownComponent;
}());
MnDropdownComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-dropdown',
                template: "\n        <ng-content></ng-content>\n    ",
                styles: ['mn-dropdown {  position: relative;  z-index: 1;}mn-dropdown mn-dropdown-content {  position: absolute;  z-index: 2;  left: -9999px;  top: -9999px;  padding: 8px;  border: 1px solid #eee;}'],
                encapsulation: core_1.ViewEncapsulation.None
            },] },
];
/** @nocollapse */
MnDropdownComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
exports.MnDropdownComponent = MnDropdownComponent;
var MnDropdownContentComponent = (function () {
    function MnDropdownContentComponent() {
    }
    MnDropdownContentComponent.prototype.ngOnInit = function () {
    };
    return MnDropdownContentComponent;
}());
MnDropdownContentComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-dropdown-content',
                template: "\n        <ng-content></ng-content>\n    ",
                encapsulation: core_1.ViewEncapsulation.None
            },] },
];
/** @nocollapse */
MnDropdownContentComponent.ctorParameters = function () { return []; };
exports.MnDropdownContentComponent = MnDropdownContentComponent;
//# sourceMappingURL=mn-dropdown.component.js.map