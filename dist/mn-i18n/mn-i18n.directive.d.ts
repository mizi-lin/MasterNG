import { ElementRef, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { MnI18nServices } from './mn-i18n.services';
export declare class MnI18nDirective implements AfterViewInit, OnChanges, DoCheck {
    private elm;
    private $$I18nServices;
    i18n: any;
    lang: string;
    key: string;
    constructor(elm: ElementRef, $$I18nServices: MnI18nServices);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngDoCheck(): void;
}
