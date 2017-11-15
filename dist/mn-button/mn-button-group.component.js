"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ButtonGroupComponent = (function () {
    function ButtonGroupComponent() {
    }
    ButtonGroupComponent.prototype.ngOnInit = function () {
    };
    ButtonGroupComponent.prototype.ngOnChanges = function (changes) {
    };
    return ButtonGroupComponent;
}());
ButtonGroupComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-btn-group',
                template: "\n        <ng-content></ng-content>            \n    "
            },] },
];
/** @nocollapse */
ButtonGroupComponent.ctorParameters = function () { return []; };
ButtonGroupComponent.propDecorators = {
    'type': [{ type: core_1.Input },],
};
exports.ButtonGroupComponent = ButtonGroupComponent;
//# sourceMappingURL=mn-button-group.component.js.map