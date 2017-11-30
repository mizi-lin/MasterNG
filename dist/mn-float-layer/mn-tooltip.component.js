"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnTooltipComponent = (function () {
    function MnTooltipComponent(_ref) {
        var _this = this;
        this._ref = _ref;
        this._click = this.hover_;
        this._showTypes = 'mouseover';
        this._position = 'top center';
        this.result = new core_1.EventEmitter();
        this._status = 'hide';
        this._evt = mu.debounce(function ($event) {
            var type = $event.type;
            if (type === 'mouseover' || type === 'click') {
                _this._status = 'show';
            }
            else if (type === 'mouseleave') {
                _this._status = 'hide';
            }
        }, 300);
    }
    MnTooltipComponent.prototype.hover_ = function ($event) {
        var _this = this;
        mu.run(this._hasEvt($event.type), function () { return _this._evt($event); });
    };
    MnTooltipComponent.prototype.out_ = function ($event) {
        this._evt($event);
    };
    MnTooltipComponent.prototype._hasEvt = function (type) {
        var types = this._showTypes.split(',');
        var _rst = types.filter(function (_type) {
            return _type.trim() === type;
        });
        return !mu.isEmpty(_rst);
    };
    MnTooltipComponent.prototype._result = function ($event) {
        this.result.emit($event);
    };
    MnTooltipComponent.prototype.ngOnInit = function () {
    };
    return MnTooltipComponent;
}());
MnTooltipComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: '[mnTooltip]',
                template: "\n        <ng-content></ng-content>\n        <ng-template\n                [mnLayerModule]=\"'mnc-tooltip'\"\n                [mnLayerPosition]=\"_position\"\n                [mnLayerStatus]=\"_status\"\n                [mnLayerHideEvt]=\"_hideType\"\n                [mnLayerSourceRef]=\"_ref\"\n                (mnResult)=\"_result($event)\"\n                mnLayer>\n            <div [innerHTML]=\"_tooltip\"></div>\n        </ng-template>\n    ",
                // styles: ['mn-dropdown {  display: inline-block;  height: 32px;}.mnc-layer-container {  position: fixed;  top: 0;  left: 0;  right: 0;  bottom: 0;  z-index: 1000;  pointer-events: none;}.mnc-layer {  position: absolute;  z-index: 2;  border: 1px solid #eee;  background: #fff;  min-width: 10px;  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);  pointer-events: auto;}.mnc-layer.mnc-hide {  visibility: hidden;  pointer-events: none;}.mnc-layer.mnc-show {  visibility: visible;  pointer-events: auto;}.mnc-tooltip > div {  position: relative;  padding: 8px;  background-color: gray;  border-radius: 3px;  color: #fff;}.mnc-tooltip > div::after {  content: \'\';  position: absolute;  border: 5px solid transparent;  border-top-color: gray;  top: 100%;  left: calc(45%);}.mnc-tooltip .mnc-top0.mnc-left1::after {  left: 15%;}'],
                encapsulation: core_1.ViewEncapsulation.None
            },] },
];
/** @nocollapse */
MnTooltipComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
MnTooltipComponent.propDecorators = {
    'hover_': [{ type: core_1.HostListener, args: ['mouseover', ['$event'],] },],
    '_click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    'out_': [{ type: core_1.HostListener, args: ['mouseleave', ['$event'],] },],
    '_tooltip': [{ type: core_1.Input, args: ['mnTooltip',] },],
    '_showTypes': [{ type: core_1.Input, args: ['mnShowTypes',] },],
    '_hideType': [{ type: core_1.Input, args: ['mnHideEventType',] },],
    '_position': [{ type: core_1.Input, args: ['mnPosition',] },],
    'result': [{ type: core_1.Output, args: ['mnResult',] },],
};
exports.MnTooltipComponent = MnTooltipComponent;
//# sourceMappingURL=mn-tooltip.component.js.map