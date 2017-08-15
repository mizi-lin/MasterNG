import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, HostListener, Host, forwardRef, Inject, Output, EventEmitter
} from '@angular/core';
import * as mu from 'mzmu';
import {PanelComponent} from './panel.component';
declare const mu: any;

@Component({
    selector: 'tool-compress',
    template: `
        <i class="fa fa-compress" aria-hidden="true"></i>
    `,
    styles: [
        `
            
        `
    ]
})
export class ToolCompressComponent implements OnInit {
    @HostListener('click') onClick(event: any){
        mu.run(this._panel, (o) => {
            o._renderer.removeClass(o._ref.nativeElement, 'full-screen');
            this.fsClick.emit(true);
        });
    }

    @Output() fsClick = new EventEmitter<any>();

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2,
                @Inject(forwardRef(() => PanelComponent)) private _panel
    ) {
    }

    ngOnInit(): void {
    }

}