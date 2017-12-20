"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_req_service_1 = require("./mn-req.service");
var MnReqLoaderComponent = (function () {
    function MnReqLoaderComponent(_reqServ) {
        var _this = this;
        this._reqServ = _reqServ;
        _reqServ.progress$.subscribe(function (v) {
            _this.progress = v;
        });
    }
    MnReqLoaderComponent.prototype.ngOnInit = function () {
    };
    MnReqLoaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-req-loader',
                    template: "\n        <mn-loader-bar [progress]=\"progress\" position=\"fixed\" [where]=\"'http-load'\"></mn-loader-bar>\n    "
                },] },
    ];
    /** @nocollapse */
    MnReqLoaderComponent.ctorParameters = function () { return [
        { type: mn_req_service_1.MnReqServices, },
    ]; };
    return MnReqLoaderComponent;
}());
exports.MnReqLoaderComponent = MnReqLoaderComponent;
//# sourceMappingURL=mn-req-loader.component.js.map