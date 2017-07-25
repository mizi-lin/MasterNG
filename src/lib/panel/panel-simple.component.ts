import {
    Component, Input, ElementRef, ContentChildren, ViewChild,
    Renderer2, OnChanges, SimpleChanges, HostListener, ContentChild, HostBinding, forwardRef, AfterViewInit,
    AfterContentInit, AfterContentChecked
} from '@angular/core';
import * as mu from 'mzmu';
import {PanelBodyComponent} from './panel-body.component';
import {PanelComponent} from './panel.component';
declare var mu: any;

@Component({
    selector: 'panel-s,panel-simple',
    template: `
        <panel>
            <panel-header>
                <panel-title [innerHTML]="_title">
                </panel-title>
                <panel-toolbar [tools]="tools"></panel-toolbar>
            </panel-header>
            <panel-body>
                <ng-content></ng-content>
            </panel-body>
        </panel>
    `,
    styles: [
        `
            :host {
               width: 100%;
            }
        `
    ]
})
export class PanelSimpleComponent implements OnChanges, AfterContentChecked {

    _title: string;

    @Input() set title(v) {
        let tt = v.split('::');
        this._title = tt[0] + mu.run(tt[1], (small) => `<small>${small}</small>`, () => '');
    };

    @Input() tools: string[];
    @Input() theme: string;

    @ViewChild(PanelComponent) _panel: any;

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngAfterContentChecked(): void {
    }

}