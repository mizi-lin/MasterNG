import { PipeTransform } from '@angular/core';
import { MnI18nServices } from './mn-i18n.services';
export declare class MnI18nPipe implements PipeTransform {
    private _mis;
    locale: any;
    lang: string;
    constructor(_mis: MnI18nServices);
    transform(value: any, ...args: any[]): any;
}
