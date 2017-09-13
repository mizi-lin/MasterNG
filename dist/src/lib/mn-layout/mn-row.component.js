"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnRowComponent = (function () {
    function MnRowComponent(_ref, _renderer) {
        this._ref = _ref;
        this._renderer = _renderer;
    }
    MnRowComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.exist(changes['gutter'], function () {
            var i = Math.ceil(_this.gutter / 2);
            _this._renderer.setStyle(_this._ref.nativeElement, 'marginLeft', -i + 'px');
            _this._renderer.setStyle(_this._ref.nativeElement, 'marginRight', -i + 'px');
            _this._renderer.addClass(_this._ref.nativeElement, 'gutter-' + i);
        });
    };
    return MnRowComponent;
}());
MnRowComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-row, [mn-row], mn-fill, [mn-fill]',
                template: '<ng-content></ng-content>',
                styleUrls: ['./layout.scss']
            },] },
];
/** @nocollapse */
MnRowComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
MnRowComponent.propDecorators = {
    'gutter': [{ type: core_1.Input },],
    'where': [{ type: core_1.Input },],
};
exports.MnRowComponent = MnRowComponent;
//# sourceMappingURL=mn-row.component.js.map