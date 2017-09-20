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
                styles: [':host {  display: flex;  flex-wrap: wrap;  align-items: stretch;  box-sizing: border-box;}:host :host::ng-deep .gutter-1 > mn-col {  padding-left: 1px;  padding-right: 1px;}:host :host::ng-deep .gutter-2 > mn-col {  padding-left: 2px;  padding-right: 2px;}:host :host::ng-deep .gutter-3 > mn-col {  padding-left: 3px;  padding-right: 3px;}:host :host::ng-deep .gutter-4 > mn-col {  padding-left: 4px;  padding-right: 4px;}:host :host::ng-deep .gutter-5 > mn-col {  padding-left: 5px;  padding-right: 5px;}:host :host::ng-deep .gutter-6 > mn-col {  padding-left: 6px;  padding-right: 6px;}:host :host::ng-deep .gutter-7 > mn-col {  padding-left: 7px;  padding-right: 7px;}:host :host::ng-deep .gutter-8 > mn-col {  padding-left: 8px;  padding-right: 8px;}:host :host::ng-deep .gutter-9 > mn-col {  padding-left: 9px;  padding-right: 9px;}:host :host::ng-deep .gutter-10 > mn-col {  padding-left: 10px;  padding-right: 10px;}:host :host::ng-deep .gutter-11 > mn-col {  padding-left: 11px;  padding-right: 11px;}:host :host::ng-deep .gutter-12 > mn-col {  padding-left: 12px;  padding-right: 12px;}:host :host::ng-deep .gutter-13 > mn-col {  padding-left: 13px;  padding-right: 13px;}:host :host::ng-deep .gutter-14 > mn-col {  padding-left: 14px;  padding-right: 14px;}:host :host::ng-deep .gutter-15 > mn-col {  padding-left: 15px;  padding-right: 15px;}:host :host::ng-deep .gutter-16 > mn-col {  padding-left: 16px;  padding-right: 16px;}:host :host::ng-deep .gutter-17 > mn-col {  padding-left: 17px;  padding-right: 17px;}:host :host::ng-deep .gutter-18 > mn-col {  padding-left: 18px;  padding-right: 18px;}:host :host::ng-deep .gutter-19 > mn-col {  padding-left: 19px;  padding-right: 19px;}:host :host::ng-deep .gutter-20 > mn-col {  padding-left: 20px;  padding-right: 20px;}:host :host::ng-deep .gutter-21 > mn-col {  padding-left: 21px;  padding-right: 21px;}:host :host::ng-deep .gutter-22 > mn-col {  padding-left: 22px;  padding-right: 22px;}:host :host::ng-deep .gutter-23 > mn-col {  padding-left: 23px;  padding-right: 23px;}:host :host::ng-deep .gutter-24 > mn-col {  padding-left: 24px;  padding-right: 24px;}:host :host::ng-deep .gutter-25 > mn-col {  padding-left: 25px;  padding-right: 25px;}:host :host::ng-deep .gutter-26 > mn-col {  padding-left: 26px;  padding-right: 26px;}:host :host::ng-deep .gutter-27 > mn-col {  padding-left: 27px;  padding-right: 27px;}:host :host::ng-deep .gutter-28 > mn-col {  padding-left: 28px;  padding-right: 28px;}:host :host::ng-deep .gutter-29 > mn-col {  padding-left: 29px;  padding-right: 29px;}:host :host::ng-deep .gutter-30 > mn-col {  padding-left: 30px;  padding-right: 30px;}:host :host::ng-deep .gutter-31 > mn-col {  padding-left: 31px;  padding-right: 31px;}:host :host::ng-deep .gutter-32 > mn-col {  padding-left: 32px;  padding-right: 32px;}']
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