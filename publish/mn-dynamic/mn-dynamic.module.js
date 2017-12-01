"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_dynamic_template_directive_1 = require("./mn-dynamic-template.directive");
var mn_dynamic_component_service_1 = require("./mn-dynamic-component.service");
var mn_dynamic_component_component_1 = require("./mn-dynamic-component.component");
/**
 * MnDynamicModule
 * 该模块包含
 * 1. MnDynamicTemplateDirective 动态载入template
 * 2. MnDynamicComponentComponent 动态载入Component
 * 3 todo 动态载入Router
 */
var MnDynamicModule = (function () {
    function MnDynamicModule() {
    }
    MnDynamicModule.forRoot = function (modules) {
        if (modules === void 0) { modules = []; }
        return {
            ngModule: MnDynamicModule,
            providers: [
                {
                    provide: mn_dynamic_template_directive_1.ExtraModules,
                    useValue: { items: modules }
                }
            ]
        };
    };
    MnDynamicModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        mn_dynamic_template_directive_1.MnDynamicTemplateDirective,
                        mn_dynamic_component_component_1.MnUnknownDynamicComponent,
                        mn_dynamic_component_component_1.MnDynamicComponentComponent
                    ],
                    exports: [
                        mn_dynamic_template_directive_1.MnDynamicTemplateDirective,
                        // MnUnknownDynamicComponent,
                        mn_dynamic_component_component_1.MnDynamicComponentComponent
                    ],
                    entryComponents: [
                        mn_dynamic_component_component_1.MnUnknownDynamicComponent
                    ],
                    providers: [
                        mn_dynamic_component_service_1.MnDynamicServices
                    ]
                },] },
    ];
    /** @nocollapse */
    MnDynamicModule.ctorParameters = function () { return []; };
    return MnDynamicModule;
}());
exports.MnDynamicModule = MnDynamicModule;
//# sourceMappingURL=mn-dynamic.module.js.map