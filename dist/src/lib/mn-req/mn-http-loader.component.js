"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_req_service_1 = require("./mn-req.service");
var MnHttpLoaderComponent = (function () {
    function MnHttpLoaderComponent(_reqServ) {
        var _this = this;
        this._reqServ = _reqServ;
        _reqServ.progress$.subscribe(function (v) {
            _this.progress = v;
        });
    }
    MnHttpLoaderComponent.prototype.ngOnInit = function () {
    };
    return MnHttpLoaderComponent;
}());
MnHttpLoaderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'http-loader',
                template: "\n        <mn-loader-bar [progress]=\"progress\" position=\"fixed\" [where]=\"'http-load'\"></mn-loader-bar>\n    "
            },] },
];
/** @nocollapse */
MnHttpLoaderComponent.ctorParameters = function () { return [
    { type: mn_req_service_1.MnReqService, },
]; };
exports.MnHttpLoaderComponent = MnHttpLoaderComponent;
//# sourceMappingURL=mn-http-loader.component.js.map