import {Component, OnInit} from '@angular/core';
import {MnI18nServices} from '../../lib/mn-i18n/mn-i18n.services';
declare const mu: any;

@Component({
    selector: 'mn-demo-i18n',
    templateUrl: './demo-i18n.component.html',
    styleUrls: ['./demo-i18n.component.scss']
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
