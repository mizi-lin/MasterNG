import {
    Component, Input, ElementRef, ViewChild,
    Renderer2, OnChanges, SimpleChanges,
    AfterContentChecked, HostBinding
} from '@angular/core';
import {MnPanelComponent} from './mn-panel.component';
declare const mu: any;

@Component({
    selector: 'mn-panel-s,mn-panel-simple',
    template: `
        <mn-panel [hph]="true">
            <mn-panel-header>
                <mn-panel-title [innerHTML]="_title">
                </mn-panel-title>
                <mn-panel-toolbar [tools]="tools">
                </mn-panel-toolbar>
            </mn-panel-header>
            <mn-panel-body>
                <ng-content></ng-content>
            </mn-panel-body>
        </mn-panel>
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
export class MnPanelSimpleComponent implements OnChanges, AfterContentChecked {

    _title: string;

    @Input()
    set title(v) {
        const [parent, sub] = (v || '').split('::');
        this._title = parent + mu.run(sub, (sub) => `<small>${sub}</small>`, () => '');
    }

    @Input() tools: string[];
    @Input() theme: string;

    // 让控件支持高度100%
    // height percent hundred
    @Input() hph: boolean | string = true;
    @HostBinding('style.height') get getHph() {
        return this.hph === true ? '100%' : this.hph === false ? 'auto' : this.hph;
    }

    @ViewChild(MnPanelComponent) _panel: any;

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngAfterContentChecked(): void {
    }

}
