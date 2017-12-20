"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_i18n_pipe_1 = require("./mn-i18n.pipe");
var mn_i18n_directive_1 = require("./mn-i18n.directive");
var mn_i18n_services_1 = require("./mn-i18n.services");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/Rx");
var MnI18nModule = (function () {
    function MnI18nModule() {
    }
    MnI18nModule.forRoot = function () {
        return {
            ngModule: MnI18nModule
        };
    };
    MnI18nModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        http_1.HttpModule
                    ],
                    declarations: [
                        mn_i18n_pipe_1.MnI18nPipe,
                        mn_i18n_directive_1.MnI18nDirective
                    ],
                    exports: [
                        mn_i18n_pipe_1.MnI18nPipe,
                        mn_i18n_directive_1.MnI18nDirective
                    ],
                    providers: [
                        mn_i18n_services_1.MnI18nServices
                    ]
                },] },
    ];
    /** @nocollapse */
    MnI18nModule.ctorParameters = function () { return []; };
    return MnI18nModule;
}());
exports.MnI18nModule = MnI18nModule;
//# sourceMappingURL=mn-i18n.module.js.map