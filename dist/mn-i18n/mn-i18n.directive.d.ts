import { ElementRef, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { MnI18nServices } from './mn-i18n.services';
export declare class MnI18nDirective implements AfterViewInit, OnChanges, DoCheck {
    private _elm;
    private _mis;
    i18n: any;
    lang: string;
    key: string;
    constructor(_elm: ElementRef, _mis: MnI18nServices);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngDoCheck(): void;
}
