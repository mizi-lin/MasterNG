"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_row_component_1 = require("./mn-row.component");
var mn_col_component_1 = require("./mn-col.component");
var MnLayoutModule = (function () {
    function MnLayoutModule() {
    }
    MnLayoutModule.forRoot = function () {
        return {
            ngModule: MnLayoutModule
        };
    };
    return MnLayoutModule;
}());
MnLayoutModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule
                ],
                declarations: [
                    mn_row_component_1.MnRowComponent,
                    mn_col_component_1.MnColComponent
                ],
                exports: [
                    mn_row_component_1.MnRowComponent,
                    mn_col_component_1.MnColComponent
                ],
                providers: [
                    mn_row_component_1.MnRowComponent
                ]
            },] },
];
/** @nocollapse */
MnLayoutModule.ctorParameters = function () { return []; };
exports.MnLayoutModule = MnLayoutModule;
//# sourceMappingURL=mn-layout.module.js.map