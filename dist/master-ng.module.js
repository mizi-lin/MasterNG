"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_layout_module_1 = require("./mn-layout/mn-layout.module");
var mn_panel_module_1 = require("./mn-panel/mn-panel.module");
var mn_button_module_1 = require("./mn-button/mn-button.module");
var mn_loader_bar_module_1 = require("./mn-loader-bar/mn-loader-bar.module");
var mn_dynamic_module_1 = require("./mn-dynamic/mn-dynamic.module");
var mn_req_module_1 = require("./mn-req/mn-req.module");
var mn_echarts_module_1 = require("./mn-echarts/mn-echarts.module");
var mn_common_module_1 = require("./mn-common/mn-common.module");
var mn_i18n_module_1 = require("./mn-i18n/mn-i18n.module");
var mn_rule_module_1 = require("./mn-rule/mn-rule.module");
var mn_datetime_module_1 = require("./mn-datetime-picker/mn-datetime.module");
var mn_float_layer_module_1 = require("./mn-float-layer/mn-float-layer.module");
var mn_form_module_1 = require("./mn-form/mn-form.module");
var MasterNgModule = (function () {
    function MasterNgModule() {
    }
    MasterNgModule.forRoot = function () {
        return {
            ngModule: MasterNgModule
        };
    };
    return MasterNgModule;
}());
MasterNgModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    mn_layout_module_1.MnLayoutModule,
                    mn_panel_module_1.MnPanelModule,
                    mn_button_module_1.MnButtonModule,
                    mn_loader_bar_module_1.MnLoaderBarModule,
                    mn_dynamic_module_1.MnDynamicModule.forRoot([
                        mn_layout_module_1.MnLayoutModule,
                        mn_panel_module_1.MnPanelModule,
                        mn_button_module_1.MnButtonModule
                    ]),
                    mn_req_module_1.MnReqModule,
                    mn_echarts_module_1.MnEchartsModule,
                    mn_common_module_1.MnCommonModule,
                    mn_i18n_module_1.MnI18nModule,
                    mn_rule_module_1.MnRuleModule,
                    mn_datetime_module_1.MnDatetimeModule,
                    mn_float_layer_module_1.MnFloatLayerModule,
                    mn_form_module_1.MnFormModule
                ],
                exports: [
                    mn_layout_module_1.MnLayoutModule,
                    mn_panel_module_1.MnPanelModule,
                    mn_button_module_1.MnButtonModule,
                    mn_loader_bar_module_1.MnLoaderBarModule,
                    mn_dynamic_module_1.MnDynamicModule,
                    mn_req_module_1.MnReqModule,
                    mn_echarts_module_1.MnEchartsModule,
                    mn_common_module_1.MnCommonModule,
                    mn_i18n_module_1.MnI18nModule,
                    mn_rule_module_1.MnRuleModule,
                    mn_datetime_module_1.MnDatetimeModule,
                    mn_float_layer_module_1.MnFloatLayerModule,
                    mn_form_module_1.MnFormModule
                ]
            },] },
];
/** @nocollapse */
MasterNgModule.ctorParameters = function () { return []; };
exports.MasterNgModule = MasterNgModule;
//# sourceMappingURL=master-ng.module.js.map