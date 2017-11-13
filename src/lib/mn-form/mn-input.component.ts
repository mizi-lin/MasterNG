import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

declare const mu: any;

@Component({
    selector: 'mn-input',
    template: `
        <mn-fill>
            <mn-col [order]="1">
                <ng-content select=".mnc-prev"></ng-content>
            </mn-col>
            <mn-col [order]="2" [span]="1" [style.position]="'relative'">
                <input
                        [attr.name]="mnName"
                        [attr.type]="mnType"
                        [attr.id]="mnId"
                        [attr.placeholder]="mnPlaceHolder"
                        [disabled]="mnDisabled"
                        [readonly]="mnReadonly"
                        [value]="mnValue"
                        (blur)="mnBlur.emit($event)"
                        (focus)="mnFocus.emit($event)"
                        (click)="mnClick.emit($event)"
                        class="mn-input">
            </mn-col>
            <mn-col [order]="3">
                <ng-content select=".mnc-next"></ng-content>
            </mn-col>
        </mn-fill>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./mn-form.scss']
})
export class MnInputComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    @Input() mnPlaceHolder: string;
    @Input() mnType: string = 'text';
    @Input() mnId: string;
    @Input() mnName: string;
    @Input() mnDisabled: boolean = false;
    @Input() mnReadonly: boolean = false;

    @Output() mnBlur: any = new EventEmitter<any>();
    @Output() mnFocus: any = new EventEmitter<any>();
    @Output() mnClick: any = new EventEmitter<any>();

    _value: string;

    mnValue: any;

    @Input('mnValue')
    set _mnValue(value: any) {
        this.mnValue = mu.ifnvl(value, '');
    }

    // get mnValue(): any {
    //     return this._value;
    // }
    //
    // set mnValue(value: any) {
    //     mu.run(value, v => this._value = v);
    // }

}
