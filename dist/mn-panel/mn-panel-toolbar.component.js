"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var PanelToolbarComponent = (function () {
    function PanelToolbarComponent(_ref, _renderer) {
        this._ref = _ref;
        this._renderer = _renderer;
        // -> fullscreen  控制全屏控件toggle
        this.fullscreen = false;
        // -> toolMap
        this.toolMap = {};
    }
    PanelToolbarComponent.prototype.fullscreen_click = function ($event) {
        this.fullscreen = !this.fullscreen;
        this.toolMap['fullscreen']._click(this.fullscreen, $event);
    };
    PanelToolbarComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.exist(changes['tools'], function () {
            _this.toolMap = mu.map(_this.tools || [], function (key, i) {
                if (typeof key === 'string') {
                    key = {
                        name: key
                    };
                }
                key.order = key.order || (i + 1) * 10;
                // key.click = key.click || mu.noop;
                key._click = function ($event) {
                    if (key.click) {
                        return key.click($event);
                    }
                };
                return {
                    __key__: key.name,
                    __val__: key
                };
            }, {});
        });
    };
    return PanelToolbarComponent;
}());
PanelToolbarComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-panel-toolbar',
                template: "\n        <mn-row [gutter]=\"8\" [where]=\"where\">\n            <mn-col *ngIf=\"toolMap['fullscreen']\" [order]=\"toolMap['fullscreen'].order\">\n                <tool-expand *ngIf=\"!fullscreen\" (fsClick)=\"fullscreen_click($event)\"></tool-expand>\n                <tool-compress *ngIf=\"fullscreen\" (fsClick)=\"fullscreen_click($event)\"></tool-compress>\n            </mn-col>\n\n            <mn-col *ngIf=\"toolMap['remove']\" [order]=\"toolMap['remove'].order\">\n                <i class=\"fa fa-remove\" aria-hidden=\"true\"></i>\n            </mn-col>\n\n            <mn-col *ngIf=\"toolMap['reload']\" [order]=\"toolMap['reload'].order\">\n                <tool-refresh (fsClick)=\"toolMap['reload']._click($event)\"></tool-refresh>\n            </mn-col>\n\n            <mn-col *ngIf=\"toolMap['collapse']\" [order]=\"toolMap['collapse'].order\">\n                <tool-collapse-up></tool-collapse-up>\n                <tool-collapse-down></tool-collapse-down>\n            </mn-col>\n\n            <mn-col *ngIf=\"toolMap['|']\" [order]=\"toolMap['|'].order\">\n                <ng-content></ng-content>\n            </mn-col>\n\n            <ng-content select=\"mn-col\"></ng-content>\n            <ng-content select=\"ng-template\"></ng-content>\n        </mn-row>\n    ",
                styles: []
            },] },
];
/** @nocollapse */
PanelToolbarComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
PanelToolbarComponent.propDecorators = {
    'tools': [{ type: core_1.Input },],
    'where': [{ type: core_1.Input },],
};
exports.PanelToolbarComponent = PanelToolbarComponent;
//# sourceMappingURL=mn-panel-toolbar.component.js.map