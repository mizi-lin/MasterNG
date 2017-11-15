"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var mn_panel_component_1 = require("./mn-panel.component");
var ToolCompressComponent = (function () {
    function ToolCompressComponent(_ref, _renderer, _panel) {
        this._ref = _ref;
        this._renderer = _renderer;
        this._panel = _panel;
        this.fsClick = new core_1.EventEmitter();
    }
    ToolCompressComponent.prototype.onClick = function ($event) {
        var _this = this;
        mu.run(this._panel, function (o) {
            o._renderer.removeClass(o._ref.nativeElement, 'full-screen');
            console.debug(':::--:::', $event);
            _this.fsClick.emit($event);
        });
    };
    ToolCompressComponent.prototype.ngOnInit = function () {
    };
    return ToolCompressComponent;
}());
ToolCompressComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tool-compress',
                template: "\n        <nz-tooltip [nzTitle]=\"'window mode'\">\n            <i class=\"icon iconfont icon-suoxiao\" nz-tooltip></i>\n        </nz-tooltip>\n    ",
                styles: [
                    "\n\n            "
                ]
            },] },
];
/** @nocollapse */
ToolCompressComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return mn_panel_component_1.MnPanelComponent; }),] },] },
]; };
ToolCompressComponent.propDecorators = {
    'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    'fsClick': [{ type: core_1.Output },],
};
exports.ToolCompressComponent = ToolCompressComponent;
//# sourceMappingURL=tool-compress.component.js.map