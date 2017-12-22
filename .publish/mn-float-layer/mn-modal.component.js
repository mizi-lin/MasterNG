"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnModalComponent = (function () {
    function MnModalComponent() {
    }
    MnModalComponent.prototype.ngOnInit = function () {
    };
    MnModalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-modal',
                    template: "\n        <mn-panel-s [title]=\"_title\"></mn-panel-s>\n    "
                },] },
    ];
    /** @nocollapse */
    MnModalComponent.ctorParameters = function () { return []; };
    MnModalComponent.propDecorators = {
        "_title": [{ type: core_1.Input, args: ['mnTitle',] },],
    };
    return MnModalComponent;
}());
exports.MnModalComponent = MnModalComponent;
//# sourceMappingURL=mn-modal.component.js.map