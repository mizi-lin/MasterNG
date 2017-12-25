"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnLayerComponent = (function () {
    function MnLayerComponent(_ref) {
        this._ref = _ref;
        console.dir(_ref.nativeElement.querySelector('div'));
    }
    MnLayerComponent.prototype.ngOnInit = function () {
    };
    MnLayerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-layer',
                    template: "\n        <!--<ng-template-->\n                <!--[mnLayerModule]=\"'modal'\"-->\n                <!--[mnLayerStatus]=\"'show'\"-->\n                <!--[mnLayerPosition]=\"'bottom left'\"-->\n                <!--[mnLayerSourceRef]=\"_ref\"-->\n                <!--mnLayer>-->\n            <!--<ng-content></ng-content>-->\n        <!--</ng-template>-->\n\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    MnLayerComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    return MnLayerComponent;
}());
exports.MnLayerComponent = MnLayerComponent;
//# sourceMappingURL=mn-layer.component.js.map