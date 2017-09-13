"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnDynamicService = (function () {
    function MnDynamicService() {
        this._componentMap = {};
    }
    MnDynamicService.prototype.setComponentMap = function (component) {
        if (component && component.name) {
            this._componentMap[component.name] = component;
        }
    };
    MnDynamicService.prototype.getComponent = function (name) {
        return this._componentMap[name];
    };
    return MnDynamicService;
}());
MnDynamicService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnDynamicService.ctorParameters = function () { return []; };
exports.MnDynamicService = MnDynamicService;
//# sourceMappingURL=mn-dynamic-component.service.js.map