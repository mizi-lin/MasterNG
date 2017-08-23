import {
    Component, Input, ElementRef, ViewChild,
    Renderer2, OnChanges, SimpleChanges,
    AfterContentChecked
} from '@angular/core';
import {PanelComponent} from './panel.component';
declare const mu: any;

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
                display: block;
                width: 100%;
            }
            `
    ]
})
export class PanelSimpleComponent implements OnChanges, AfterContentChecked {

    _title: string;

    @Input()
    set title(v) {
        const [parent, sub] = (v || '').split('::');
        this._title = parent + mu.run(sub, (sub) => `<small>${sub}</small>`, () => '');
    }

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
