"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_i18n_services_1 = require("./mn-i18n.services");
var mu = require("mzmu");
var MnI18nPipe = (function () {
    function MnI18nPipe($$I18nServices) {
        this.$$I18nServices = $$I18nServices;
        this.locale = this.$$I18nServices.locale;
        this.lang = this.$$I18nServices.config.lang;
    }
    MnI18nPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (mu.isNotExist(value)) {
            return value;
        }
        var lang = this.$$I18nServices.config.lang;
        if (mu.isEmpty(this.locale)) {
            this.locale = this.$$I18nServices.locale;
        }
        if (lang !== this.lang) {
            var locale = this.$$I18nServices.store[lang];
            if (!mu.isEmpty(locale)) {
                this.lang = lang;
                this.locale = locale;
            }
        }
        return this.$$I18nServices.translateText(this.locale, value, args);
    };
    return MnI18nPipe;
}());
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
exports.MnI18nPipe = MnI18nPipe;
//# sourceMappingURL=mn-i18n.pipe.js.map