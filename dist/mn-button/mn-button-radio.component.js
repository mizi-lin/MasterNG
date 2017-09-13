"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var ButtonRadioComponent = (function () {
    // todo ngModel
    function ButtonRadioComponent(_ref, _render) {
        this._ref = _ref;
        this._render = _render;
        this.checked = false;
    }
    ButtonRadioComponent.prototype.onclick = function (target) {
        if (target.nodeName === 'INPUT') {
            this.radio = target;
            this.checked = target.checked;
        }
    };
    ButtonRadioComponent.prototype.ngOnInit = function () {
    };
    ButtonRadioComponent.prototype.ngOnChanges = function (changes) {
    };
    ButtonRadioComponent.prototype.ngDoCheck = function () {
        var _this = this;
        mu.run(this.radio, function () {
            _this.checked = _this.radio.checked;
        });
    };
    return ButtonRadioComponent;
}());
ButtonRadioComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-btn-radio',
                template: "\n        <label mn-btn [class.active]=\"checked\" class=\"{{cls}}\">\n            <input type=\"radio\" [attr.name]=\"name\" />\n            <ng-content></ng-content>\n        </label>\n    "
            },] },
];
/** @nocollapse */
ButtonRadioComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
ButtonRadioComponent.propDecorators = {
    'type': [{ type: core_1.Input },],
    'checked': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input },],
    'cls': [{ type: core_1.Input },],
    'onclick': [{ type: core_1.HostListener, args: ['click', ['$event.target'],] },],
};
exports.ButtonRadioComponent = ButtonRadioComponent;
//# sourceMappingURL=mn-button-radio.component.js.map