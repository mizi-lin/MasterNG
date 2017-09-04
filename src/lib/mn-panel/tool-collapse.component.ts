import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, HostListener, Host, forwardRef, Inject, Output, EventEmitter
} from '@angular/core';
import * as mu from 'mzmu';
import {MnPanelComponent} from './mn-panel.component';
declare const mu: any;

@Component({
    selector: 'tool-collapse-down',
    template: `
        <i class="fa fa-chevron-down" aria-hidden="true" *ngIf="this._panel.isCollapse"></i>
    `
})
export class ToolCollapseDownComponent implements OnInit {
    @HostListener('click') onClick(event: any) {
        mu.run(this._panel, (o) => {
            o.toggle_collapse();
            this.fsClick.emit(true);
        });
    }

    @Output() fsClick = new EventEmitter<any>();

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2,
                // -> 父级 component
                // @Host() private _panel: PanelComponent
                // -> 祖踪 component
                @Inject(forwardRef(() => MnPanelComponent)) public _panel) {
    }

    ngOnInit(): void {
    }

}

@Component({
    selector: 'tool-collapse-up',
    template: `
        <i class="fa fa-chevron-up" aria-hidden="true" *ngIf="!this._panel.isCollapse"></i>
    `
})
export class ToolCollapseUpComponent implements OnInit {
    @HostListener('click') onClick(event: any) {
        mu.run(this._panel, (o) => {
            o.toggle_collapse();
            this.fsClick.emit(true);
        });
    }

    @Output() fsClick = new EventEmitter<any>();

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2,
                // -> 父级 component
                // @Host() private _panel: PanelComponent
                // -> 祖踪 component
                @Inject(forwardRef(() => MnPanelComponent)) public _panel) {

    }

    ngOnInit(): void {

    }

}