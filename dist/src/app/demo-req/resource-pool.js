"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mn_resource_1 = require("../../lib/mn-req/mn-resource");
var core_1 = require("@angular/core");
var ResourcePool = (function () {
    function ResourcePool(R) {
        this.R = R;
        this.demo = this.R.pool('assets/{store}/{name}.json');
    }
    return ResourcePool;
}());
ResourcePool.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ResourcePool.ctorParameters = function () { return [
    { type: mn_resource_1.MnResource, },
]; };
exports.ResourcePool = ResourcePool;
//# sourceMappingURL=resource-pool.js.map