import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, forwardRef, Inject, HostListener
} from '@angular/core';
import * as mu from 'mzmu';
import {PanelComponent} from './panel.component';
declare const mu: any;

@Component({
    selector: 'panel-title',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        `
        `
    ]
})
export class PanelTitleComponent implements OnInit {

    @HostListener('click', ['$event']) onClick(event: any) {
        if (this._panel.collapse) {
            this._panel.toggle_collapse();
        }
    }

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2,
                @Inject(forwardRef(() => PanelComponent)) private _panel) {
    }

    ngOnInit(): void {

    }

}