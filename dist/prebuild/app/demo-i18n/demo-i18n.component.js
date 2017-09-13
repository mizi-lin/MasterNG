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
                template: '<div class="p-16">     <h1>{{\'HELLO_WORD\' | i18n: \'i18n tester\'}} <small [i18n]>MASTER_NG</small></h1>      <div class="mt-8">         <button mn-btn [class.primary]="lang === \'zh-cn\'" (click)="setLang(\'zh-cn\')">中文</button>         <button mn-btn [class.primary]="lang === \'en\'" (click)="setLang(\'en\')">英文</button>     </div>      <mn-panel-s class="bordered mt-8" [title]="\'jing ye shi\' | i18n: {name: \'李白\', caodai: \'唐\'}">         <div [i18n]>jing_ye_shi_content</div>     </mn-panel-s> </div>  ',
                styles: ['']
            },] },
];
/** @nocollapse */
DemoI18nComponent.ctorParameters = function () { return [
    { type: mn_i18n_services_1.MnI18nServices, },
]; };
exports.DemoI18nComponent = DemoI18nComponent;
//# sourceMappingURL=demo-i18n.component.js.map