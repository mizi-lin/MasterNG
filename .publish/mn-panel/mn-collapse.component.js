"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_panel_component_1 = require("./mn-panel.component");
var mn_panel_simple_component_1 = require("./mn-panel-simple.component");
var MnCollapseComponent = (function () {
    function MnCollapseComponent() {
    }
    MnCollapseComponent.prototype.ngOnInit = function () {
    };
    MnCollapseComponent.prototype.toggleAccordion = function (_panels, _panel, state) {
        mu.each(_panels, function (__panel) {
            if (__panel !== _panel) {
                __panel._toggle_collapse(state);
            }
            else {
                __panel._toggle_collapse(_panel.isCollapse);
            }
        });
    };
    MnCollapseComponent.prototype.adjustPanels = function (_panels) {
        var _this = this;
        mu.exist(this.accordion, function (showIndex) {
            mu.each(_panels, function (_panel, index) {
                var _toggle_collapse = _panel.toggle_collapse.bind(_panel);
                _toggle_collapse(showIndex !== index);
                _panel._toggle_collapse = _toggle_collapse;
                _panel.collapse = true;
                _panel.isChanges = true;
                _panel.toggle_collapse = function () {
                    _this.toggleAccordion(_panels, _panel, true);
                };
            });
        }, function () {
            mu.each(_panels, function (_panel) {
                _panel.collapse = _this.collapse;
            });
        });
    };
    MnCollapseComponent.prototype.ngOnChanges = function (changes) {
        // console.debug(changes);
    };
    MnCollapseComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // console.debug(this._panels);
        // 重写 toggle_collapse 方法
        setTimeout(function () {
            mu.run(_this._panels, function (_panels) {
                _this.adjustPanels(_panels._results);
            });
            mu.run(_this._panelSimples, function (_ps) {
                var _panels = mu.map(_ps._results, function (o) { return o._panel; });
                _this.adjustPanels(_panels);
            });
        }, 1);
    };
    MnCollapseComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-collapse',
                    template: "\n        <ng-content></ng-content>",
                    styles: [
                        "\n            :host {\n                display: block;\n                width: 100%;\n            }\n            "
                    ]
                },] },
    ];
    /** @nocollapse */
    MnCollapseComponent.ctorParameters = function () { return []; };
    MnCollapseComponent.propDecorators = {
        "accordion": [{ type: core_1.Input },],
        "collapse": [{ type: core_1.Input },],
        "_panels": [{ type: core_1.ContentChildren, args: [mn_panel_component_1.MnPanelComponent,] },],
        "_panelSimples": [{ type: core_1.ContentChildren, args: [mn_panel_simple_component_1.MnPanelSimpleComponent,] },],
    };
    return MnCollapseComponent;
}());
exports.MnCollapseComponent = MnCollapseComponent;
//# sourceMappingURL=mn-collapse.component.js.map