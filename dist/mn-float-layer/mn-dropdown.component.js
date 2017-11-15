"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var i = 300, ii = 200;
var MnDropdownComponent = (function () {
    function MnDropdownComponent(_ref) {
        var _this = this;
        this._ref = _ref;
        this._click = this._hover;
        this.showtypes = 'mouseover';
        this.result = new core_1.EventEmitter();
        this.status = 'hide';
        this._evt = mu.debounce(function ($event) {
            var type = $event.type;
            if (type === 'mouseover' || type === 'click') {
                _this.status = 'show';
                _this.styles = {
                    left: _this._position().left + 'px',
                    top: (_this._position().top + 1) + 'px'
                };
            }
            else if (type === 'mouseleave') {
                _this.status = 'hide';
            }
        }, 300);
    }
    MnDropdownComponent.prototype._hover = function ($event) {
        var _this = this;
        mu.run(this._hasEvt($event.type), function () { return _this._evt($event); });
    };
    MnDropdownComponent.prototype._out = function ($event) {
        this._evt($event);
    };
    MnDropdownComponent.prototype._position = function () {
        var _el = this._ref.nativeElement;
        var rect = _el.getBoundingClientRect();
        var top = rect.top + rect.height;
        var left = rect.left;
        return {
            top: top,
            left: left
        };
    };
    MnDropdownComponent.prototype._hasEvt = function (type) {
        var types = this.showtypes.split(',');
        var _rst = types.filter(function (_type) {
            return _type.trim() === type;
        });
        return !mu.isEmpty(_rst);
    };
    MnDropdownComponent.prototype._result = function ($event) {
        this.result.emit($event);
    };
    MnDropdownComponent.prototype.ngOnInit = function () {
    };
    return MnDropdownComponent;
}());
MnDropdownComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-dropdown',
                template: "\n        <div>\n            <ng-content></ng-content>\n        </div>\n\n        <ng-template\n                [mnLayerModule]=\"'dropdown'\"\n                [mnLayerStatus]=\"status\"\n                [mnLayerStyle]=\"styles\"\n                [mnLayerHideEvt]=\"hidetype\"\n                (mnResult)=\"_result($event)\"\n                mnLayer>\n            <ng-content select=\"mn-dropdown-content\"></ng-content>\n        </ng-template>\n\n    ",
                styles: ['mn-dropdown {  display: inline-block;  height: 32px;}mn-dropdown mn-dropdown-content {  padding: 8px;  background: #f00;}.mnc-layer {  position: absolute;  z-index: 2;  border: 1px solid #eee;  background: #fff;  min-width: 200px;  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);}.mnc-layer.mnc-hide {  visibility: hidden;}.mnc-layer.mnc-show {  visibility: visible;}'],
                encapsulation: core_1.ViewEncapsulation.None
            },] },
];
/** @nocollapse */
MnDropdownComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
MnDropdownComponent.propDecorators = {
    '_hover': [{ type: core_1.HostListener, args: ['mouseover', ['$event'],] },],
    '_click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    '_out': [{ type: core_1.HostListener, args: ['mouseleave', ['$event'],] },],
    'showtypes': [{ type: core_1.Input, args: ['mnShowTypes',] },],
    'hidetype': [{ type: core_1.Input, args: ['mnHideEventType',] },],
    'result': [{ type: core_1.Output, args: ['mnResult',] },],
};
exports.MnDropdownComponent = MnDropdownComponent;
//# sourceMappingURL=mn-dropdown.component.js.map