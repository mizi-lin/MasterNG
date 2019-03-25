import {
    Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges, HostListener, ElementRef,
    Renderer2, DoCheck, ViewChild, AfterViewInit
} from '@angular/core';

import  mu from 'mzmu';

@Component({
    selector: 'mn-btn-radio',
    template: `
        <label mn-btn [class.active]="checked" class="{{cls}}">
            <input type="radio" [attr.name]="name" />
            <ng-content></ng-content>
        </label>
    `
})
export class ButtonRadioComponent implements OnInit, OnChanges, DoCheck {

    @Input() type: string;
    @Input() checked: boolean = false;
    @Input() name: string;
    @Input() cls: string;

    @HostListener('click', ['$event.target'])
    onclick(target) {
        if (target.nodeName === 'INPUT') {
            this.radio = target;
            this.checked = target.checked;
        }
    }

    radio: any;

    // todo ngModel

    constructor(private _ref: ElementRef,
                private _render: Renderer2) {
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngDoCheck() {
        mu.run(this.radio, () => {
            this.checked = this.radio.checked;
        });
    }

}