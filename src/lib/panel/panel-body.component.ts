import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges
} from '@angular/core';
import * as mu from 'mzmu';
declare var mu: any;

@Component({
    selector: 'panel-body',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        `
            
        `
    ]
})
export class PanelBodyComponent implements OnInit {

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnInit(): void {

    }

}