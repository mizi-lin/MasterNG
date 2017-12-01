"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MuPipe = (function () {
    function MuPipe() {
    }
    MuPipe.prototype.transform = function (value, fn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return mu.isExist(fn) ? mu[fn].apply(mu, [value].concat(args)) : value;
    };
    MuPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'mu' },] },
    ];
    /** @nocollapse */
    MuPipe.ctorParameters = function () { return []; };
    return MuPipe;
}());
exports.MuPipe = MuPipe;
//# sourceMappingURL=mn-mu.pipe.js.map