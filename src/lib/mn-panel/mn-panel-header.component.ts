import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, forwardRef, Inject, HostListener
} from '@angular/core';
import * as mu from 'mzmu';
import {MnPanelComponent} from './mn-panel.component';
declare const mu: any;

@Component({
    selector: 'mn-panel-header',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        `
            :host {
                display: flex;
                flex-wrap: wrap;
                align-items: stretch;
                box-sizing: border-box;
            }
        `
    ]
})
export class MnPanelHeaderComponent implements OnInit {



    constructor(private _ref: ElementRef,
                private _renderer: Renderer2,
                @Inject(forwardRef(() => MnPanelComponent)) private _panel) {
    }

    ngOnInit(): void {

    }

}