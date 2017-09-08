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

    constructor(private elm: ElementRef,
                private $$I18nServices: MnI18nServices) {
        this.lang = this.$$I18nServices.config.lang;
    }

    ngAfterViewInit() {
        const key = this.key = this.key || this.elm.nativeElement.innerText.trim();
        this.$$I18nServices.getText((text) => {
            this.elm.nativeElement.innerText = text;
        }, key, ...this.i18n);
    }

    ngOnChanges() {
        this.ngAfterViewInit();
    }

    ngDoCheck() {
        mu.run(this.$$I18nServices.config.lang, (lang) => {
            if (lang !== this.lang) {
                this.lang = lang;
                this.ngAfterViewInit();
            }
        });
    }
}