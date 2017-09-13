"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_handsontable_component_1 = require("./mn-handsontable.component");
var mn_common_module_1 = require("../mn-common/mn-common.module");
var MnHandsontableModule = (function () {
    function MnHandsontableModule() {
    }
    MnHandsontableModule.forRoot = function () {
        return {
            ngModule: MnHandsontableModule
        };
    };
    return MnHandsontableModule;
}());
MnHandsontableModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    mn_common_module_1.MnCommonModule
                ],
                declarations: [
                    mn_handsontable_component_1.MnHandsontableComponent
                ],
                exports: [
                    mn_handsontable_component_1.MnHandsontableComponent
                ],
                providers: []
            },] },
];
/** @nocollapse */
MnHandsontableModule.ctorParameters = function () { return []; };
exports.MnHandsontableModule = MnHandsontableModule;
//# sourceMappingURL=mn-handsontable.module.js.map