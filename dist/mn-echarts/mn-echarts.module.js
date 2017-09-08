"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var mn_common_module_1 = require("../mn-common/mn-common.module");
var mn_panel_module_1 = require("../mn-panel/mn-panel.module");
var mn_req_module_1 = require("../mn-req/mn-req.module");
var mn_layout_module_1 = require("../mn-layout/mn-layout.module");
var mn_handsontable_module_1 = require("../mn-handsontable/mn-handsontable.module");
var mn_echarts_render_directive_1 = require("./mn-echarts-render.directive");
var mn_echarts_component_1 = require("./mn-echarts.component");
var mn_echarts_panel_component_1 = require("./mn-echarts-panel.component");
var echarts_service_1 = require("./echarts.service");
var core_1 = require("@angular/core");
var MnEchartsModule = (function () {
    function MnEchartsModule() {
    }
    MnEchartsModule.forRoot = function () {
        return {
            ngModule: MnEchartsModule
        };
    };
    return MnEchartsModule;
}());
MnEchartsModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    mn_common_module_1.MnCommonModule.forRoot(),
                    mn_panel_module_1.MnPanelModule.forRoot(),
                    mn_req_module_1.MnReqModule.forRoot(),
                    mn_layout_module_1.MnLayoutModule.forRoot(),
                    mn_handsontable_module_1.MnHandsontableModule.forRoot()
                ],
                declarations: [
                    mn_echarts_render_directive_1.MnEchartsRenderDirective,
                    mn_echarts_component_1.MnEchartsComponent,
                    mn_echarts_panel_component_1.MnEchartsPanelComponent
                ],
                /**
                 * 作为子模块, 若主模块需要使用, 那么必须使用 exports
                 */
                exports: [
                    mn_echarts_render_directive_1.MnEchartsRenderDirective,
                    mn_echarts_component_1.MnEchartsComponent,
                    mn_echarts_panel_component_1.MnEchartsPanelComponent
                ],
                providers: [
                    echarts_service_1.EchartsService
                ]
            },] },
];
/** @nocollapse */
MnEchartsModule.ctorParameters = function () { return []; };
exports.MnEchartsModule = MnEchartsModule;
//# sourceMappingURL=mn-echarts.module.js.map