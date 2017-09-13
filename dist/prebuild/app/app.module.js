"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./app.component");
var demo_panel_component_1 = require("./demo-panel/demo-panel.component");
var demo_req_component_1 = require("./demo-req/demo-req.component");
var demo_echarts_component_1 = require("./demo-echarts/demo-echarts.component");
var demo_i18n_component_1 = require("./demo-i18n/demo-i18n.component");
var demo_rule_component_1 = require("./demo-rule/demo-rule.component");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var resource_pool_1 = require("./demo-req/resource-pool");
var initialize_service_1 = require("./common/initialize.service");
var core_1 = require("@angular/core");
var initialize_factory_1 = require("./common/initialize.factory");
var mn_i18n_services_1 = require("../lib/mn-i18n/mn-i18n.services");
var mn_rule_services_1 = require("../lib/mn-rule/mn-rule.services");
var ng_zorro_antd_module_1 = require("ng-zorro-antd/src/release/ng-zorro-antd.module");
var master_ng_module_1 = require("../lib/master-ng.module");
var demo_mc_component_1 = require("./demo-mc/demo-mc.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    app_component_1.AppComponent,
                    demo_panel_component_1.DemoPanelComponent,
                    demo_req_component_1.DemoReqComponent,
                    demo_echarts_component_1.DemoEchartsComponent,
                    demo_i18n_component_1.DemoI18nComponent,
                    demo_rule_component_1.DemoRuleComponent,
                    demo_mc_component_1.DemoMcComponent
                ],
                imports: [
                    platform_browser_1.BrowserModule,
                    ng_zorro_antd_module_1.NgZorroAntdModule.forRoot(),
                    router_1.RouterModule.forRoot([
                        {
                            path: 'panel',
                            component: demo_panel_component_1.DemoPanelComponent
                        },
                        {
                            path: 'req',
                            component: demo_req_component_1.DemoReqComponent
                        },
                        {
                            path: 'echarts',
                            component: demo_echarts_component_1.DemoEchartsComponent
                        },
                        {
                            path: 'i18n',
                            component: demo_i18n_component_1.DemoI18nComponent
                        },
                        {
                            path: 'rule',
                            component: demo_rule_component_1.DemoRuleComponent
                        },
                        {
                            path: 'mc',
                            component: demo_mc_component_1.DemoMcComponent
                        }
                    ], { useHash: true }),
                    master_ng_module_1.MasterNgModule.forRoot()
                ],
                providers: [
                    resource_pool_1.ResourcePool,
                    initialize_service_1.InitializeService,
                    {
                        provide: core_1.APP_INITIALIZER,
                        // 这里不要用匿名函数, webpack 会报错
                        useFactory: initialize_factory_1.InitializeFactory,
                        deps: [
                            initialize_service_1.InitializeService,
                            mn_i18n_services_1.MnI18nServices,
                            mn_rule_services_1.MnRuleServices
                        ],
                        multi: true
                    },
                ],
                bootstrap: [app_component_1.AppComponent]
            },] },
];
/** @nocollapse */
AppModule.ctorParameters = function () { return []; };
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map