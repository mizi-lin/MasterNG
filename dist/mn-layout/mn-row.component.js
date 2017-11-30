"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnRowComponent = (function () {
    function MnRowComponent(_ref, _renderer) {
        this._ref = _ref;
        this._renderer = _renderer;
        // 让控件支持高度100%
        // height percent hundred
        this.hph = true;
    }
    Object.defineProperty(MnRowComponent.prototype, "getHph", {
        get: function () {
            return this.hph === true ? '100%' : this.hph === false ? 'auto' : this.hph;
        },
        enumerable: true,
        configurable: true
    });
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
                selector: 'mn-row, mn-fill',
                template: '<ng-content></ng-content>',
                encapsulation: core_1.ViewEncapsulation.None,
                styles: ['mn-row,mn-fill {  display: flex;  flex-wrap: wrap;  align-items: stretch;  box-sizing: border-box;}mn-row > mn-col,mn-fill > mn-col {  overflow-x: hidden;}mn-row > mn-col > .mnc-content,mn-fill > mn-col > .mnc-content {  width: 100%;  height: 100%;  overflow: hidden;}mn-row > mn-col.mnc-overflow-auto,mn-fill > mn-col.mnc-overflow-auto {  overflow-x: auto;}mn-row > mn-col.mnc-overflow-auto > .mnc-content,mn-fill > mn-col.mnc-overflow-auto > .mnc-content {  overflow: auto;}mn-row > mn-col.mnc-overflow-scroll,mn-fill > mn-col.mnc-overflow-scroll {  overflow: scroll;}mn-row > mn-col.mnc-overflow-scroll > .mnc-content,mn-fill > mn-col.mnc-overflow-scroll > .mnc-content {  overflow: scroll;}mn-row.gutter-1 > mn-col,mn-fill.gutter-1 > mn-col {  padding-left: 1px;  padding-right: 1px;}mn-row.gutter-2 > mn-col,mn-fill.gutter-2 > mn-col {  padding-left: 2px;  padding-right: 2px;}mn-row.gutter-3 > mn-col,mn-fill.gutter-3 > mn-col {  padding-left: 3px;  padding-right: 3px;}mn-row.gutter-4 > mn-col,mn-fill.gutter-4 > mn-col {  padding-left: 4px;  padding-right: 4px;}mn-row.gutter-5 > mn-col,mn-fill.gutter-5 > mn-col {  padding-left: 5px;  padding-right: 5px;}mn-row.gutter-6 > mn-col,mn-fill.gutter-6 > mn-col {  padding-left: 6px;  padding-right: 6px;}mn-row.gutter-7 > mn-col,mn-fill.gutter-7 > mn-col {  padding-left: 7px;  padding-right: 7px;}mn-row.gutter-8 > mn-col,mn-fill.gutter-8 > mn-col {  padding-left: 8px;  padding-right: 8px;}mn-row.gutter-9 > mn-col,mn-fill.gutter-9 > mn-col {  padding-left: 9px;  padding-right: 9px;}mn-row.gutter-10 > mn-col,mn-fill.gutter-10 > mn-col {  padding-left: 10px;  padding-right: 10px;}mn-row.gutter-11 > mn-col,mn-fill.gutter-11 > mn-col {  padding-left: 11px;  padding-right: 11px;}mn-row.gutter-12 > mn-col,mn-fill.gutter-12 > mn-col {  padding-left: 12px;  padding-right: 12px;}mn-row.gutter-13 > mn-col,mn-fill.gutter-13 > mn-col {  padding-left: 13px;  padding-right: 13px;}mn-row.gutter-14 > mn-col,mn-fill.gutter-14 > mn-col {  padding-left: 14px;  padding-right: 14px;}mn-row.gutter-15 > mn-col,mn-fill.gutter-15 > mn-col {  padding-left: 15px;  padding-right: 15px;}mn-row.gutter-16 > mn-col,mn-fill.gutter-16 > mn-col {  padding-left: 16px;  padding-right: 16px;}mn-row.gutter-17 > mn-col,mn-fill.gutter-17 > mn-col {  padding-left: 17px;  padding-right: 17px;}mn-row.gutter-18 > mn-col,mn-fill.gutter-18 > mn-col {  padding-left: 18px;  padding-right: 18px;}mn-row.gutter-19 > mn-col,mn-fill.gutter-19 > mn-col {  padding-left: 19px;  padding-right: 19px;}mn-row.gutter-20 > mn-col,mn-fill.gutter-20 > mn-col {  padding-left: 20px;  padding-right: 20px;}mn-row.gutter-21 > mn-col,mn-fill.gutter-21 > mn-col {  padding-left: 21px;  padding-right: 21px;}mn-row.gutter-22 > mn-col,mn-fill.gutter-22 > mn-col {  padding-left: 22px;  padding-right: 22px;}mn-row.gutter-23 > mn-col,mn-fill.gutter-23 > mn-col {  padding-left: 23px;  padding-right: 23px;}mn-row.gutter-24 > mn-col,mn-fill.gutter-24 > mn-col {  padding-left: 24px;  padding-right: 24px;}mn-row.gutter-25 > mn-col,mn-fill.gutter-25 > mn-col {  padding-left: 25px;  padding-right: 25px;}mn-row.gutter-26 > mn-col,mn-fill.gutter-26 > mn-col {  padding-left: 26px;  padding-right: 26px;}mn-row.gutter-27 > mn-col,mn-fill.gutter-27 > mn-col {  padding-left: 27px;  padding-right: 27px;}mn-row.gutter-28 > mn-col,mn-fill.gutter-28 > mn-col {  padding-left: 28px;  padding-right: 28px;}mn-row.gutter-29 > mn-col,mn-fill.gutter-29 > mn-col {  padding-left: 29px;  padding-right: 29px;}mn-row.gutter-30 > mn-col,mn-fill.gutter-30 > mn-col {  padding-left: 30px;  padding-right: 30px;}mn-row.gutter-31 > mn-col,mn-fill.gutter-31 > mn-col {  padding-left: 31px;  padding-right: 31px;}mn-row.gutter-32 > mn-col,mn-fill.gutter-32 > mn-col {  padding-left: 32px;  padding-right: 32px;}']
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
    'hph': [{ type: core_1.Input },],
    'getHph': [{ type: core_1.HostBinding, args: ['style.height',] },],
};
exports.MnRowComponent = MnRowComponent;
//# sourceMappingURL=mn-row.component.js.map