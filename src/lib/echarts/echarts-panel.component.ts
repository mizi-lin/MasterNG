import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

declare const mu: any;

@Component({
    selector: 'echarts-panel',
    template: `
        <panel>
            <panel-header>
                <panel-title [innerHTML]="_title"></panel-title>
                <panel-toolbar></panel-toolbar>
            </panel-header>
            <panel-body>
                <!--<req-http></req-http>-->
            </panel-body>
        </panel>
    `,
    styles: [
            `:host {
            display: block;
            width: 100%;
        }`
    ]
})
export class EchartsPanelComponent implements OnChanges {

    @Input() req: any;

    @Input()
    set title(v) {
        this._title = v || '';
        let [parent, sub] = this._title.split('::');
        mu.run(parent || sub, () => {
            this._title = parent + mu.run(sub, (sub) => `<small>${sub}</small>`, () => '');
        });
    };

    _title: string;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {

    }

}