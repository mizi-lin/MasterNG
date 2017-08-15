import {Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges} from '@angular/core';
import * as mu from 'mzmu';
declare const mu: any;

@Component({
    selector: '[btn]',
    template: `
        <ng-template [ngIf]="icon">
            <i class="fa fa-{{icon}}"></i>
        </ng-template>
        <span>
            <ng-content></ng-content>
        </span>
        <span *ngIf="symbol" class="symbol">
            <i class="fa fa-{{symbol}} symbol"></i>
        </span>
            
    `
})
export class ButtonComponent implements OnInit, OnChanges {
    @HostBinding('class.master-btn') masterBtn: boolean = true;
    @HostBinding('class.master-btn-circle') masterBtnCircle: boolean = false;
    @HostBinding('class.master-btn-square') masterBtnSquare: boolean = false;
    @HostBinding('class.master-btn-full') masterBtnFull: boolean = false;
    @HostBinding('class.master-icon-symbol') masterBtnSymbol: boolean = false;

    @Input() icon: string;
    @Input() shape: string;
    @Input() symbol: string;

    constructor() {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.exist(changes['shape'], () => {
            this.masterBtnCircle = this.shape === 'circle';
            this.masterBtnSquare = this.shape === 'square';
            this.masterBtnFull = this.shape === 'full';
        });

        mu.exist(changes['symbol'], () => {
            this.masterBtnSymbol = true;
        });
    }

}