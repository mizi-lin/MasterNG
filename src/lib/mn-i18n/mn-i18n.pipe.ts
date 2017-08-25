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

    constructor(private $$I18nServices: MnI18nServices) {
        this.locale = this.$$I18nServices.locale;
        this.lang = this.$$I18nServices.config.lang;
    }

    transform(value: any, ...args: any[]): any {
        if ((<any>mu).isNotExist(value)) {
            return value;
        }

        const lang = this.$$I18nServices.config.lang;

        if (mu.isEmpty(this.locale)) {
            this.locale = this.$$I18nServices.locale;
        }

        if (lang !== this.lang) {
            const locale = this.$$I18nServices.store[lang];
            if (!mu.isEmpty(locale)) {
                this.lang = lang;
                this.locale = locale;
            }
        }

        return this.$$I18nServices.translateText(this.locale, value, args);
    }
}
