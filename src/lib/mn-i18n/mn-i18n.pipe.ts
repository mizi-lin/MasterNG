import {Pipe, PipeTransform} from '@angular/core';
import {MnI18nServices} from './mn-i18n.services';
import * as mu from 'mzmu';

@Pipe({
    name: 'i18n',
    pure: false
})
export class MnI18nPipe implements PipeTransform {
    locale: any;
    lang: string;

    constructor(private _mis: MnI18nServices) {
        this.locale = this._mis.locale;
        this.lang = this._mis.config.lang;
    }

    transform(value: any, ...args: any[]): any {
        if (mu.isNotExist(value)) {
            return value;
        }

        const lang = this._mis.config.lang;

        if (mu.isEmpty(this.locale)) {
            this.locale = this._mis.locale;
        }

        if (lang !== this.lang) {
            const locale = this._mis.store[lang];
            if (!mu.isEmpty(locale)) {
                this.lang = lang;
                this.locale = locale;
            }
        }

        return this._mis.translateText(this.locale, value, args);
    }
}
