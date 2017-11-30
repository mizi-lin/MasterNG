"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_layout_module_1 = require("./mn-layout/mn-layout.module");
var MasterNgModule = (function () {
    function MasterNgModule() {
    }
    MasterNgModule.forRoot = function (modules) {
        if (modules === void 0) { modules = []; }
        return {
            ngModule: MasterNgModule,
            providers: []
        };
    };
    return MasterNgModule;
}());
MasterNgModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    mn_layout_module_1.MnLayoutModule
                ],
                exports: [
                    mn_layout_module_1.MnLayoutModule
                ]
            },] },
];
/** @nocollapse */
MasterNgModule.ctorParameters = function () { return []; };
exports.MasterNgModule = MasterNgModule;
//# sourceMappingURL=master-ng.module.js.map