"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_loader_bar_component_1 = require("./mn-loader-bar.component");
var MnLoaderBarModule = (function () {
    function MnLoaderBarModule() {
    }
    MnLoaderBarModule.forRoot = function () {
        return {
            ngModule: MnLoaderBarModule
        };
    };
    return MnLoaderBarModule;
}());
MnLoaderBarModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule
                ],
                declarations: [
                    mn_loader_bar_component_1.MnLoaderBarComponent
                ],
                exports: [
                    mn_loader_bar_component_1.MnLoaderBarComponent
                ],
                providers: []
            },] },
];
/** @nocollapse */
MnLoaderBarModule.ctorParameters = function () { return []; };
exports.MnLoaderBarModule = MnLoaderBarModule;
//# sourceMappingURL=mn-loader-bar.module.js.map