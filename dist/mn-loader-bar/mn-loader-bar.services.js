"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnLoaderBarServices = (function () {
    function MnLoaderBarServices() {
        this.config = {
            loader: true
        };
    }
    MnLoaderBarServices.prototype.setConfig = function (config) {
        if (config === void 0) { config = {}; }
        this.config = mu.extend({}, this.config, config);
    };
    MnLoaderBarServices.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnLoaderBarServices.ctorParameters = function () { return []; };
    return MnLoaderBarServices;
}());
exports.MnLoaderBarServices = MnLoaderBarServices;
//# sourceMappingURL=mn-loader-bar.services.js.map