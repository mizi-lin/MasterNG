import {Directive, ElementRef, Input, AfterViewInit, OnChanges, DoCheck} from '@angular/core';
import {MnI18nServices} from './mn-i18n.services';
import * as mu from 'mzmu';

@Directive({
    selector: '[i18n]'
})
export class MnI18nDirective implements AfterViewInit, OnChanges, DoCheck {
    @Input() i18n;
    lang: string;
    key: string;

    constructor(private _elm: ElementRef,
                private _mis: MnI18nServices) {
        this.lang = this._mis.config.lang;
    }

    ngAfterViewInit() {
        const key = this.key = this.key || this._elm.nativeElement.innerText.trim();
        this._mis.getText((text) => {
            this._elm.nativeElement.innerText = text;
        }, key, ...this.i18n);
    }

    ngOnChanges() {
        this.ngAfterViewInit();
    }

    ngDoCheck() {
        mu.run(this._mis.config.lang, (lang) => {
            if (lang !== this.lang) {
                this.lang = lang;
                this.ngAfterViewInit();
            }
        });
    }
}