import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges
} from '@angular/core';
import * as mu from 'mzmu';
declare var mu: any;

@Component({
    selector: 'panel',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        `
            :host {
               width: 100%;
            }
            
            
        `
    ]
})
export class PanelComponent implements OnInit {

    @Input() border: number;


    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnInit(): void {

    }

}