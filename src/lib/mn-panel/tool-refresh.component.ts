import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, HostListener, Host, forwardRef, Inject, Output, EventEmitter
} from '@angular/core';
import * as mu from 'mzmu';
import {MnPanelComponent} from './mn-panel.component';
declare const mu: any;

@Component({
    selector: 'tool-refresh',
    template: `
        <i class="fa fa-refresh" aria-hidden="true" (click)="_click($event)" ></i>
    `,
    styles: [
        `
            
        `
    ]
})
export class ToolRefreshComponent implements OnInit {
    @Output() fsClick: any = new EventEmitter<any>();

    _click($event): void {
        this.fsClick.emit($event);
    }

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2,
                // -> 父级 component
                // @Host() private _panel: PanelComponent
                // -> 祖踪 component
                @Inject(forwardRef(() => MnPanelComponent)) private _panel) {

    }

    ngOnInit(): void {

    }
}
