"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var MnButtonComponent = (function () {
    function MnButtonComponent() {
        this.masterBtn = true;
        this.masterBtnCircle = false;
        this.masterBtnSquare = false;
        this.masterBtnFull = false;
        this.masterBtnSymbol = false;
    }
    MnButtonComponent.prototype.ngOnInit = function () {
    };
    MnButtonComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.exist(changes['shape'], function () {
            _this.masterBtnCircle = _this.shape === 'circle';
            _this.masterBtnSquare = _this.shape === 'square';
            _this.masterBtnFull = _this.shape === 'full';
        });
        mu.exist(changes['symbol'], function () {
            _this.masterBtnSymbol = true;
        });
    };
    return MnButtonComponent;
}());
MnButtonComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-btn, [mn-btn]',
                template: "\n        <ng-template [ngIf]=\"icon\">\n            <i class=\"fa fa-{{icon}}\"></i>\n        </ng-template>\n        <span>\n            <ng-content></ng-content>\n        </span>\n        <span *ngIf=\"symbol\" class=\"symbol\">\n            <i class=\"fa fa-{{symbol}} symbol\"></i>\n        </span>\n            \n    "
            },] },
];
/** @nocollapse */
MnButtonComponent.ctorParameters = function () { return []; };
MnButtonComponent.propDecorators = {
    'masterBtn': [{ type: core_1.HostBinding, args: ['class.mn-btn',] },],
    'masterBtnCircle': [{ type: core_1.HostBinding, args: ['class.mn-btn-circle',] },],
    'masterBtnSquare': [{ type: core_1.HostBinding, args: ['class.mn-btn-square',] },],
    'masterBtnFull': [{ type: core_1.HostBinding, args: ['class.mn-btn-full',] },],
    'masterBtnSymbol': [{ type: core_1.HostBinding, args: ['class.mn-icon-symbol',] },],
    'icon': [{ type: core_1.Input },],
    'shape': [{ type: core_1.Input },],
    'symbol': [{ type: core_1.Input },],
};
exports.MnButtonComponent = MnButtonComponent;
//# sourceMappingURL=mn-button.component.js.map