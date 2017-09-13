"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var TrustUrlPipe = (function () {
    function TrustUrlPipe(_dst) {
        this._dst = _dst;
    }
    TrustUrlPipe.prototype.transform = function (value, args) {
        return this._dst.bypassSecurityTrustResourceUrl(value);
    };
    return TrustUrlPipe;
}());
TrustUrlPipe.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'trust'
            },] },
];
/** @nocollapse */
TrustUrlPipe.ctorParameters = function () { return [
    { type: platform_browser_1.DomSanitizer, },
]; };
exports.TrustUrlPipe = TrustUrlPipe;
//# sourceMappingURL=mn-trust-url.pipe.js.map