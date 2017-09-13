"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_collapse_component_1 = require("./mn-collapse.component");
var mn_panel_component_1 = require("./mn-panel.component");
var mn_panel_header_component_1 = require("./mn-panel-header.component");
var mn_panel_title_component_1 = require("./mn-panel-title.component");
var mn_panel_body_component_1 = require("./mn-panel-body.component");
var mn_panel_bottom_component_1 = require("./mn-panel-bottom.component");
var mn_panel_toolbar_component_1 = require("./mn-panel-toolbar.component");
var tool_expand_component_1 = require("./tool-expand.component");
var tool_compress_component_1 = require("./tool-compress.component");
var tool_collapse_component_1 = require("./tool-collapse.component");
var mn_panel_simple_component_1 = require("./mn-panel-simple.component");
var tool_refresh_component_1 = require("./tool-refresh.component");
var ng_zorro_antd_module_1 = require("ng-zorro-antd/src/release/ng-zorro-antd.module");
var mn_layout_module_1 = require("../mn-layout/mn-layout.module");
var MnPanelModule = (function () {
    function MnPanelModule() {
    }
    MnPanelModule.forRoot = function () {
        return {
            ngModule: MnPanelModule
        };
    };
    return MnPanelModule;
}());
MnPanelModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    mn_layout_module_1.MnLayoutModule.forRoot(),
                    ng_zorro_antd_module_1.NgZorroAntdModule.forRoot()
                ],
                declarations: [
                    mn_panel_component_1.MnPanelComponent,
                    mn_panel_header_component_1.MnPanelHeaderComponent,
                    mn_panel_title_component_1.MnPanelTitleComponent,
                    mn_panel_toolbar_component_1.PanelToolbarComponent,
                    mn_panel_body_component_1.MnPanelBodyComponent,
                    mn_panel_bottom_component_1.MnPanelBottomComponent,
                    tool_expand_component_1.ToolExpandComponent,
                    tool_compress_component_1.ToolCompressComponent,
                    tool_collapse_component_1.ToolCollapseDownComponent,
                    tool_collapse_component_1.ToolCollapseUpComponent,
                    tool_refresh_component_1.ToolRefreshComponent,
                    mn_collapse_component_1.MnCollapseComponent,
                    mn_panel_simple_component_1.MnPanelSimpleComponent
                ],
                exports: [
                    mn_panel_component_1.MnPanelComponent,
                    mn_panel_header_component_1.MnPanelHeaderComponent,
                    mn_panel_title_component_1.MnPanelTitleComponent,
                    mn_panel_toolbar_component_1.PanelToolbarComponent,
                    mn_panel_body_component_1.MnPanelBodyComponent,
                    mn_panel_bottom_component_1.MnPanelBottomComponent,
                    tool_expand_component_1.ToolExpandComponent,
                    tool_compress_component_1.ToolCompressComponent,
                    tool_collapse_component_1.ToolCollapseDownComponent,
                    tool_collapse_component_1.ToolCollapseUpComponent,
                    mn_collapse_component_1.MnCollapseComponent,
                    mn_panel_simple_component_1.MnPanelSimpleComponent
                ],
                providers: []
            },] },
];
/** @nocollapse */
MnPanelModule.ctorParameters = function () { return []; };
exports.MnPanelModule = MnPanelModule;
//# sourceMappingURL=mn-panel.module.js.map