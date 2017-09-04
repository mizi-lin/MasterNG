import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, forwardRef, Inject, HostListener
} from '@angular/core';
import * as mu from 'mzmu';
import {MnPanelComponent} from './mn-panel.component';
declare const mu: any;

@Component({
    selector: 'mn-panel-title',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        `
        `
    ]
})
export class MnPanelTitleComponent implements OnInit {

    @HostListener('click', ['$event']) onClick(event: any) {
        if (this._panel.collapse) {
            this._panel.toggle_collapse();
        }
    }

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2,
                @Inject(forwardRef(() => MnPanelComponent)) private _panel) {
    }

    ngOnInit(): void {

    }

}