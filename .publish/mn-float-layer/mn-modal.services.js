"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_layer_container_service_1 = require("./mn-layer-container.service");
var MnModalServices = (function () {
    function MnModalServices(_appRef, _cfr, _lcs) {
        // this._mcf = _cfr.resolveComponentFactory(MnModalComponent);
        this._appRef = _appRef;
        this._cfr = _cfr;
        this._lcs = _lcs;
    }
    MnModalServices.prototype.open = function (config) {
        if (config === void 0) { config = {}; }
        // if (config.id) {
        //     this._layer = this._lcs.createLayerElement('mn-modal', config.id);
        // } else if (!this._layer) {
        //     this._layer = this._lcs.createLayerElement('mn-modal');
        // }
        //
        // this._layer.innerHTML = `<mn-modal [title]="config.title"></mn-modal>`;
        //
        // this._appRef.bootstrap(MnModalComponent, this._layer);
    };
    MnModalServices.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnModalServices.ctorParameters = function () { return [
        { type: core_1.ApplicationRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: mn_layer_container_service_1.MnLayerContainerService, },
    ]; };
    return MnModalServices;
}());
exports.MnModalServices = MnModalServices;
//# sourceMappingURL=mn-modal.services.js.map