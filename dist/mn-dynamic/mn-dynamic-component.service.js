"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnDynamicServices = (function () {
    function MnDynamicServices() {
        this._componentMap = {};
    }
    MnDynamicServices.prototype.setComponentMap = function (component) {
        if (component && component.name) {
            this._componentMap[component.name] = component;
        }
    };
    MnDynamicServices.prototype.getComponent = function (name) {
        return this._componentMap[name];
    };
    return MnDynamicServices;
}());
MnDynamicServices.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnDynamicServices.ctorParameters = function () { return []; };
exports.MnDynamicServices = MnDynamicServices;
//# sourceMappingURL=mn-dynamic-component.service.js.map