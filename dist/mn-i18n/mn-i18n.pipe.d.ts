import { PipeTransform } from '@angular/core';
import { MnI18nServices } from './mn-i18n.services';
export declare class MnI18nPipe implements PipeTransform {
    private $$I18nServices;
    locale: any;
    lang: string;
    constructor($$I18nServices: MnI18nServices);
    transform(value: any, ...args: any[]): any;
}
