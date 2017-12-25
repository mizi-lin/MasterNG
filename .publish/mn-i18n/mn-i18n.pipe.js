"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_i18n_services_1 = require("./mn-i18n.services");
var MnI18nPipe = (function () {
    function MnI18nPipe(_mis) {
        this._mis = _mis;
        this.locale = this._mis.locale;
        this.lang = this._mis.config.lang;
    }
    MnI18nPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (mu.isNotExist(value)) {
            return value;
        }
        var lang = this._mis.config.lang;
        if (mu.isEmpty(this.locale)) {
            this.locale = this._mis.locale;
        }
        if (lang !== this.lang) {
            var locale = this._mis.store[lang];
            if (!mu.isEmpty(locale)) {
                this.lang = lang;
                this.locale = locale;
            }
        }
        return this._mis.translateText(this.locale, value, args);
    };
    MnI18nPipe.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'i18n',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    MnI18nPipe.ctorParameters = function () { return [
        { type: mn_i18n_services_1.MnI18nServices, },
    ]; };
    return MnI18nPipe;
}());
exports.MnI18nPipe = MnI18nPipe;
//# sourceMappingURL=mn-i18n.pipe.js.map