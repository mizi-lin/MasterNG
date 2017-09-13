import { OnInit } from '@angular/core';
import { MnI18nServices } from '../../lib/mn-i18n/mn-i18n.services';
export declare class DemoI18nComponent implements OnInit {
    private _i18nServ;
    lang: string;
    constructor(_i18nServ: MnI18nServices);
    ngOnInit(): void;
    setLang(lang: any): void;
}
