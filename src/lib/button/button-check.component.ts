import {Component, OnInit, Input, HostListener, OnChanges, SimpleChanges} from '@angular/core';
import * as mu from 'mzmu';
declare var mu: any;

@Component({
    selector: 'btn-checkbox',
    template: `
        <label btn [class.active]="checked">
            <input type="checkbox" />
            <ng-content></ng-content>
        </label>         
    `
})
export class ButtonCheckComponent implements OnInit, OnChanges {

    @Input() type: string;
    @Input() checked: boolean = false;
    @Input() name: string;

    @HostListener('click', ['$event.target']) onclick(target) {
        if(target.nodeName === 'INPUT'){
            this.checked = target.checked;
        }
    };

    //todo ngModel
    constructor() {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

}