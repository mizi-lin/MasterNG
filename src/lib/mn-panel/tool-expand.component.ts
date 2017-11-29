import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, HostListener, Host, forwardRef, Inject, Output, EventEmitter
} from '@angular/core';
import * as mu from 'mzmu';
import {MnPanelComponent} from './mn-panel.component';

declare const mu: any;

@Component({
    selector: 'tool-expand',
    template: `
        <i class="icon iconfont icon-fangda" mnTooltip="full-screen mode"></i>
    `,
    styles: [
            `

        `
    ]
})
export class ToolExpandComponent implements OnInit {
    @HostListener('click')
    onClick(event: any) {
        mu.run(this._panel, (o) => {
            o._renderer.addClass(o._ref.nativeElement, 'full-screen');
            this.fsClick.emit(true);
        });
    }

    @Output() fsClick = new EventEmitter<any>();

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