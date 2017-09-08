"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_button_component_1 = require("./mn-button.component");
var mn_button_group_component_1 = require("./mn-button-group.component");
var mn_button_radio_component_1 = require("./mn-button-radio.component");
var mn_button_check_component_1 = require("./mn-button-check.component");
var MnButtonModule = (function () {
    function MnButtonModule() {
    }
    MnButtonModule.forRoot = function () {
        return {
            ngModule: MnButtonModule
        };
    };
    return MnButtonModule;
}());
MnButtonModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule
                ],
                declarations: [
                    mn_button_component_1.MnButtonComponent,
                    mn_button_group_component_1.ButtonGroupComponent,
                    mn_button_radio_component_1.ButtonRadioComponent,
                    mn_button_check_component_1.ButtonCheckComponent
                ],
                exports: [
                    mn_button_component_1.MnButtonComponent,
                    mn_button_group_component_1.ButtonGroupComponent,
                    mn_button_radio_component_1.ButtonRadioComponent,
                    mn_button_check_component_1.ButtonCheckComponent
                ],
                providers: []
            },] },
];
/** @nocollapse */
MnButtonModule.ctorParameters = function () { return []; };
exports.MnButtonModule = MnButtonModule;
//# sourceMappingURL=mn-button.module.js.map