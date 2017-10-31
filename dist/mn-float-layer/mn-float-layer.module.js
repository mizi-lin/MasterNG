"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_dropdown_component_1 = require("./mn-dropdown.component");
var MnFloatLayerModule = (function () {
    function MnFloatLayerModule() {
    }
    MnFloatLayerModule.forRoot = function () {
        return {
            ngModule: MnFloatLayerModule
        };
    };
    return MnFloatLayerModule;
}());
MnFloatLayerModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                ],
                declarations: [
                    mn_dropdown_component_1.MnDropdownComponent,
                    mn_dropdown_component_1.MnDropdownContentComponent
                ],
                exports: [
                    mn_dropdown_component_1.MnDropdownComponent,
                    mn_dropdown_component_1.MnDropdownContentComponent
                ],
                providers: []
            },] },
];
/** @nocollapse */
MnFloatLayerModule.ctorParameters = function () { return []; };
exports.MnFloatLayerModule = MnFloatLayerModule;
//# sourceMappingURL=mn-float-layer.module.js.map