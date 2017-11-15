"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_common_module_1 = require("../mn-common/mn-common.module");
var forms_1 = require("@angular/forms");
var mn_layout_module_1 = require("../mn-layout/mn-layout.module");
var mn_input_component_1 = require("./mn-input.component");
var MnFormModule = (function () {
    function MnFormModule() {
    }
    MnFormModule.forRoot = function () {
        return {
            ngModule: MnFormModule
        };
    };
    return MnFormModule;
}());
MnFormModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    mn_common_module_1.MnCommonModule,
                    mn_layout_module_1.MnLayoutModule
                ],
                declarations: [
                    mn_input_component_1.MnInputComponent
                ],
                exports: [
                    mn_input_component_1.MnInputComponent
                ],
                providers: []
            },] },
];
/** @nocollapse */
MnFormModule.ctorParameters = function () { return []; };
exports.MnFormModule = MnFormModule;
//# sourceMappingURL=mn-form.module.js.map