"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_i18n_services_1 = require("./mn-i18n.services");
var mu = require("mzmu");
var MnI18nDirective = (function () {
    function MnI18nDirective(elm, $$I18nServices) {
        this.elm = elm;
        this.$$I18nServices = $$I18nServices;
        this.lang = this.$$I18nServices.config.lang;
    }
    MnI18nDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var key = this.key = this.key || this.elm.nativeElement.innerText.trim();
        (_a = this.$$I18nServices).getText.apply(_a, [function (text) {
                _this.elm.nativeElement.innerText = text;
            }, key].concat(this.i18n));
        var _a;
    };
    MnI18nDirective.prototype.ngOnChanges = function () {
        this.ngAfterViewInit();
    };
    MnI18nDirective.prototype.ngDoCheck = function () {
        var _this = this;
        mu.run(this.$$I18nServices.config.lang, function (lang) {
            if (lang !== _this.lang) {
                _this.lang = lang;
                _this.ngAfterViewInit();
            }
        });
    };
    return MnI18nDirective;
}());
MnI18nDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[i18n]'
            },] },
];
/** @nocollapse */
MnI18nDirective.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: mn_i18n_services_1.MnI18nServices, },
]; };
MnI18nDirective.propDecorators = {
    'i18n': [{ type: core_1.Input },],
};
exports.MnI18nDirective = MnI18nDirective;
//# sourceMappingURL=mn-i18n.directive.js.map