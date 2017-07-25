import {
    Component, Input, ElementRef, ContentChildren, ViewChild,
    Renderer2, OnChanges, SimpleChanges, HostListener, ContentChild, HostBinding, forwardRef, AfterViewInit,
    AfterContentInit, AfterContentChecked
} from '@angular/core';
import * as mu from 'mzmu';
import {PanelBodyComponent} from './panel-body.component';
declare var mu: any;

@Component({
    selector: 'panel-s,panel-simple',
    template: `
        <panel>
            <panel-header>
                <panel-title [innerHTML]="title">
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

    @Input() title: string;
    @Input() tools: string[];
    @Input() theme: string;

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngAfterContentChecked(): void {
    }

}