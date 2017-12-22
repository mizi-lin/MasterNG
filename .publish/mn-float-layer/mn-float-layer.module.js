"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_dropdown_component_1 = require("./mn-dropdown.component");
var mn_dropdown_content_component_1 = require("./mn-dropdown-content.component");
var mn_layer_directive_1 = require("./mn-layer.directive");
var mn_layer_container_service_1 = require("./mn-layer-container.service");
var mn_common_module_1 = require("../mn-common/mn-common.module");
var mn_form_module_1 = require("../mn-form/mn-form.module");
var mn_tooltip_component_1 = require("./mn-tooltip.component");
var mn_modal_component_1 = require("./mn-modal.component");
var mn_modal_services_1 = require("./mn-modal.services");
var mn_layer_component_1 = require("./mn-layer.component");
var mn_panel_module_1 = require("../mn-panel/mn-panel.module");
var MnFloatLayerModule = (function () {
    function MnFloatLayerModule() {
    }
    MnFloatLayerModule.forRoot = function () {
        return {
            ngModule: MnFloatLayerModule
        };
    };
    MnFloatLayerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        mn_common_module_1.MnCommonModule,
                        mn_form_module_1.MnFormModule,
                        mn_panel_module_1.MnPanelModule
                    ],
                    declarations: [
                        mn_dropdown_component_1.MnDropdownComponent,
                        mn_dropdown_content_component_1.MnDropdownContentComponent,
                        mn_tooltip_component_1.MnTooltipComponent,
                        mn_layer_directive_1.MnLayerDirective,
                        mn_modal_component_1.MnModalComponent,
                        mn_layer_component_1.MnLayerComponent
                    ],
                    exports: [
                        mn_dropdown_component_1.MnDropdownComponent,
                        mn_dropdown_content_component_1.MnDropdownContentComponent,
                        mn_tooltip_component_1.MnTooltipComponent,
                        mn_layer_directive_1.MnLayerDirective,
                        mn_modal_component_1.MnModalComponent,
                        mn_layer_component_1.MnLayerComponent
                    ],
                    entryComponents: [
                        mn_modal_component_1.MnModalComponent,
                        mn_layer_component_1.MnLayerComponent
                    ],
                    providers: [
                        mn_layer_container_service_1.MnLayerContainerService,
                        mn_modal_services_1.MnModalServices
                    ]
                },] },
    ];
    /** @nocollapse */
    MnFloatLayerModule.ctorParameters = function () { return []; };
    return MnFloatLayerModule;
}());
exports.MnFloatLayerModule = MnFloatLayerModule;
//# sourceMappingURL=mn-float-layer.module.js.map