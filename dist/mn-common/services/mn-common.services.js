"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_dynamic_component_service_1 = require("../../mn-dynamic/mn-dynamic-component.service");
var MnCommonServices = (function () {
    function MnCommonServices(_dynamicService) {
        this._dynamicService = _dynamicService;
    }
    return MnCommonServices;
}());
MnCommonServices.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnCommonServices.ctorParameters = function () { return [
    { type: mn_dynamic_component_service_1.MnDynamicServices, },
]; };
exports.MnCommonServices = MnCommonServices;
//# sourceMappingURL=mn-common.services.js.map