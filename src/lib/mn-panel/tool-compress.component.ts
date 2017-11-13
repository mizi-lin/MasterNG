import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, HostListener, Host, forwardRef, Inject, Output, EventEmitter
} from '@angular/core';
import * as mu from 'mzmu';
import {MnPanelComponent} from './mn-panel.component';

declare const mu: any;

@Component({
    selector: 'tool-compress',
    template: `
        <nz-tooltip [nzTitle]="'window mode'">
            <i class="icon iconfont icon-suoxiao" nz-tooltip></i>
        </nz-tooltip>
    `,
    styles: [
            `

            `
    ]
})
export class ToolCompressComponent implements OnInit {
    @HostListener('click', ['$event'])
    onClick($event: any) {
        mu.run(this._panel, (o) => {
            o._renderer.removeClass(o._ref.nativeElement, 'full-screen');
            console.debug(':::--:::', $event);
            this.fsClick.emit($event);
        });
    }

    @Output() fsClick = new EventEmitter<any>();

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2,
                @Inject(forwardRef(() => MnPanelComponent)) private _panel) {
    }

    ngOnInit(): void {
    }

}
