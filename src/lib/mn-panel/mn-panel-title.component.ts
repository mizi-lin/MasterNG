import {
    Component, OnInit, ElementRef,
    Renderer2, forwardRef, Inject, HostListener
} from '@angular/core';
import {MnPanelComponent} from './mn-panel.component';

import * as mu from 'mzmu';

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

    @HostListener('click', ['$event'])
    onClick(event: any) {
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
