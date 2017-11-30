"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ButtonCheckComponent = (function () {
    // todo ngModel
    function ButtonCheckComponent() {
        this.checked = false;
    }
    ButtonCheckComponent.prototype.onclick = function (target) {
        if (target.nodeName === 'INPUT') {
            this.checked = target.checked;
        }
    };
    ButtonCheckComponent.prototype.ngOnInit = function () {
    };
    ButtonCheckComponent.prototype.ngOnChanges = function (changes) {
    };
    return ButtonCheckComponent;
}());
ButtonCheckComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-btn-checkbox',
                template: "\n        <label mn-btn [class.active]=\"checked\">\n            <input type=\"checkbox\" />\n            <ng-content></ng-content>\n        </label>\n    "
            },] },
];
/** @nocollapse */
ButtonCheckComponent.ctorParameters = function () { return []; };
ButtonCheckComponent.propDecorators = {
    'type': [{ type: core_1.Input },],
    'checked': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input },],
    'onclick': [{ type: core_1.HostListener, args: ['click', ['$event.target'],] },],
};
exports.ButtonCheckComponent = ButtonCheckComponent;
//# sourceMappingURL=mn-button-check.component.js.map