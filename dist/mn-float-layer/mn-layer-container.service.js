"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnLayerContainerService = (function () {
    function MnLayerContainerService() {
    }
    MnLayerContainerService.prototype.ngOnDestroy = function () {
        var _this = this;
        mu.run(mu.prop(this, '_containerElement.parentNode'), function (_parent) { return _parent.removeChild(_this._containerElement); });
    };
    MnLayerContainerService.prototype.getContainer = function () {
        var _this = this;
        mu.empty(this._containerElement, function () { return _this._createContainer(); });
        return this._containerElement;
    };
    MnLayerContainerService.prototype._createContainer = function () {
        var container = document.createElement('div');
        container.classList.add('mnc-layer-container');
        document.body.appendChild(container);
        this._containerElement = container;
    };
    return MnLayerContainerService;
}());
MnLayerContainerService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnLayerContainerService.ctorParameters = function () { return []; };
exports.MnLayerContainerService = MnLayerContainerService;
//# sourceMappingURL=mn-layer-container.service.js.map