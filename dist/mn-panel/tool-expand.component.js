"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var mn_panel_component_1 = require("./mn-panel.component");
var ToolExpandComponent = (function () {
    function ToolExpandComponent(_ref, _renderer, 
        // -> 父级 component
        // @Host() private _panel: PanelComponent
        // -> 祖踪 component
        _panel) {
        this._ref = _ref;
        this._renderer = _renderer;
        this._panel = _panel;
        this.fsClick = new core_1.EventEmitter();
    }
    ToolExpandComponent.prototype.onClick = function (event) {
        var _this = this;
        mu.run(this._panel, function (o) {
            o._renderer.addClass(o._ref.nativeElement, 'full-screen');
            _this.fsClick.emit(true);
        });
    };
    ToolExpandComponent.prototype.ngOnInit = function () {
    };
    return ToolExpandComponent;
}());
ToolExpandComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tool-expand',
                template: "\n        <i class=\"icon iconfont icon-fangda\" mnTooltip=\"full-screen mode\"></i>\n    ",
                styles: [
                    "\n\n        "
                ]
            },] },
];
/** @nocollapse */
ToolExpandComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return mn_panel_component_1.MnPanelComponent; }),] },] },
]; };
ToolExpandComponent.propDecorators = {
    'onClick': [{ type: core_1.HostListener, args: ['click',] },],
    'fsClick': [{ type: core_1.Output },],
};
exports.ToolExpandComponent = ToolExpandComponent;
//# sourceMappingURL=tool-expand.component.js.map