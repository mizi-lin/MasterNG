import {Component, ContentChild, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MnTabContentComponent} from './mn-tabContent.component';
declare const mu: any;

@Component({
    selector: 'mn-tab',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MnTabComponent implements OnInit {

    _options: any = {};

    @Input('mnOptions')
    set options_(val) {
        this._options = val;
        mu.empty(this._options.key, () => {
            this._options.key = this._options.title;
        });
    }

    _title: string;

    @Input('mnTitle')
    set title_(val) {
        this._options.title = val;
        mu.empty(this._options.key, () => {
            this._options.key = this._options.title;
        });
    }

    @Input('mnKey')
    set key_(val) {
        this._options.key = val;
    }

    @Input('mnTemplate')
    set template_(val) {
        this._options._temp = val;
    }

    @ContentChild(MnTabContentComponent)
    set content_(val) {
        // console.debug(val);
        mu.run(val, () => {
            this._options.template = val._template;
            this._options._temp = val._temp;
            // this._options = mu.clone(this._options);
            // console.debug('~~~~~~', this._options, val._template, val);
        });
    }

    constructor() {
    }

    ngOnInit() {
    }
}
