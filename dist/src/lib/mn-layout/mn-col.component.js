"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var mn_row_component_1 = require("./mn-row.component");
var MnColComponent = (function () {
    // todo padding
    function MnColComponent(_rowCmp, _ref, _renderer) {
        this._rowCmp = _rowCmp;
        this._ref = _ref;
        this._renderer = _renderer;
        this.span = 0;
        this.order = 0;
        // setTimeout(() => {
        //     console.debug(this._rowCmp);
        // }, 10);
    }
    Object.defineProperty(MnColComponent.prototype, "paddingLeft", {
        get: function () {
            return this._rowCmp && this._rowCmp.gutter / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnColComponent.prototype, "paddingRight", {
        get: function () {
            return this._rowCmp && this._rowCmp.gutter / 2;
        },
        enumerable: true,
        configurable: true
    });
    MnColComponent.prototype.ngOnInit = function () {
    };
    MnColComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(changes['span'], function () {
            _this._renderer.addClass(_this._ref.nativeElement, 'col-' + _this.span);
        });
        mu.run(changes['order'], function () {
            _this._renderer.setStyle(_this._ref.nativeElement, 'order', _this.order);
        });
    };
    return MnColComponent;
}());
MnColComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-col',
                template: "\n        <ng-content></ng-content>\n    "
            },] },
];
/** @nocollapse */
MnColComponent.ctorParameters = function () { return [
    { type: mn_row_component_1.MnRowComponent, decorators: [{ type: core_1.Optional }, { type: core_1.Host },] },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
MnColComponent.propDecorators = {
    'span': [{ type: core_1.Input },],
    'order': [{ type: core_1.Input },],
    'paddingLeft': [{ type: core_1.HostBinding, args: ['style.padding-left.px',] },],
    'paddingRight': [{ type: core_1.HostBinding, args: ['style.padding-right.px',] },],
};
exports.MnColComponent = MnColComponent;
//# sourceMappingURL=mn-col.component.js.map