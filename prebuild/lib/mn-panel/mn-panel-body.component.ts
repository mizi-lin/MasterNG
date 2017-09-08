import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges
} from '@angular/core';
import * as mu from 'mzmu';

declare const mu: any;

@Component({
    selector: 'mn-panel-body',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
            `:host {
            display: block;
            width: 100%;
            height: calc(100% - 40px);
        }`
    ]
})
export class MnPanelBodyComponent implements OnInit {

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnInit(): void {

    }

}