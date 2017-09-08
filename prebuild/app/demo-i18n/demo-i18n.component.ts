import {Component, OnInit} from '@angular/core';
import {MnI18nServices} from '../../lib/mn-i18n/mn-i18n.services';
declare const mu: any;

@Component({
    selector: 'mn-demo-i18n',
    template: '<div class="p-16">     <h1>{{\'HELLO_WORD\' | i18n: \'i18n tester\'}} <small [i18n]>MASTER_NG</small></h1>      <div class="mt-8">         <button mn-btn [class.primary]="lang === \'zh-cn\'" (click)="setLang(\'zh-cn\')">中文</button>         <button mn-btn [class.primary]="lang === \'en\'" (click)="setLang(\'en\')">英文</button>     </div>      <mn-panel-s class="bordered mt-8" [title]="\'jing ye shi\' | i18n: {name: \'李白\', caodai: \'唐\'}">         <div [i18n]>jing_ye_shi_content</div>     </mn-panel-s> </div>  ',
    styles: ['']
})
export class DemoI18nComponent implements OnInit {

    lang: string;

    constructor(
        private _i18nServ: MnI18nServices
    ) {
        this.lang = mu.storage('I18N_LANG');
    }

    ngOnInit() {
    }

    setLang(lang) {
        this.lang = lang;
        this._i18nServ.setLang(lang);
    }

}
