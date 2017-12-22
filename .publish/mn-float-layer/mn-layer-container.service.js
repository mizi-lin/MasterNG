"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnLayerContainerService = (function () {
    function MnLayerContainerService() {
        this._nextUniqueId = 1;
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
    MnLayerContainerService.prototype.createLayerElement = function (moduleName, id) {
        id = "mnc-layer-" + (id || (this._nextUniqueId++));
        var layer = document.querySelector("#" + id) || document.createElement('div');
        layer.id = id;
        layer.classList.add('mnc-layer');
        layer.classList.add(moduleName);
        this.getContainer().appendChild(layer);
        return layer;
    };
    MnLayerContainerService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnLayerContainerService.ctorParameters = function () { return []; };
    return MnLayerContainerService;
}());
exports.MnLayerContainerService = MnLayerContainerService;
//# sourceMappingURL=mn-layer-container.service.js.map