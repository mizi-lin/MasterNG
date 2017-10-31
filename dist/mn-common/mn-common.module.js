"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_trust_url_pipe_1 = require("./pipe/mn-trust-url.pipe");
var mn_mu_pipe_1 = require("./pipe/mn-mu.pipe");
var mn_file_saver_services_1 = require("./services/mn-file-saver.services");
var mn_element_ref_directive_1 = require("./directive/mn-element-ref.directive");
var MnCommonModule = (function () {
    function MnCommonModule() {
    }
    MnCommonModule.forRoot = function () {
        return {
            ngModule: MnCommonModule
        };
    };
    return MnCommonModule;
}());
MnCommonModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule
                ],
                declarations: [
                    mn_trust_url_pipe_1.TrustUrlPipe,
                    mn_mu_pipe_1.MuPipe,
                    mn_element_ref_directive_1.MnElementRefDirective
                ],
                exports: [
                    mn_trust_url_pipe_1.TrustUrlPipe,
                    mn_mu_pipe_1.MuPipe,
                    mn_element_ref_directive_1.MnElementRefDirective
                ],
                providers: [
                    mn_file_saver_services_1.MnFileSaverServices
                ]
            },] },
];
/** @nocollapse */
MnCommonModule.ctorParameters = function () { return []; };
exports.MnCommonModule = MnCommonModule;
//# sourceMappingURL=mn-common.module.js.map