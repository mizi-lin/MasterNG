"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_i18n_services_1 = require("../../lib/mn-i18n/mn-i18n.services");
var DemoI18nComponent = (function () {
    function DemoI18nComponent(_i18nServ) {
        this._i18nServ = _i18nServ;
        this.lang = mu.storage('I18N_LANG');
    }
    DemoI18nComponent.prototype.ngOnInit = function () {
    };
    DemoI18nComponent.prototype.setLang = function (lang) {
        this.lang = lang;
        this._i18nServ.setLang(lang);
    };
    return DemoI18nComponent;
}());
DemoI18nComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-demo-i18n',
                templateUrl: './demo-i18n.component.html',
                styleUrls: ['./demo-i18n.component.scss']
            },] },
];
/** @nocollapse */
DemoI18nComponent.ctorParameters = function () { return [
    { type: mn_i18n_services_1.MnI18nServices, },
]; };
exports.DemoI18nComponent = DemoI18nComponent;
//# sourceMappingURL=demo-i18n.component.js.map