import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MnTabComponent} from './mn-tab.component';

import  mu from 'mzmu';

@Component({
    selector: 'mn-tabs',
    template: `
        <ng-content></ng-content>
        <article>
            <menu>
                <ng-container *ngFor="let tab of _options?.tabs; let inx = index">
                    <nav [class.ms-tabActive]="_actived(_options.active, inx, tab, _options?.tabs)">
                        <a href="javascript:;" [innerHTML]="tab?.title"
                           (click)="_clickTabTitle(tab, inx)"></a>
                    </nav>
                </ng-container>
            </menu>
            <section>
                <ng-container *ngFor="let tab of _options?.tabs; let inx = index">
                    <div *ngIf="_actived(_options.active, inx, tab, _options?.tabs)">
                        <div [innerHTML]="tab?.template"></div>
                        <ng-container *ngTemplateOutlet="tab._temp"></ng-container>
                    </div>
                </ng-container>
            </section>
        </article>
    `,
    styleUrls: ['./mn-tabs.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnTabsComponent implements OnInit {

    _options: any = {
        tabs: []
    };

    // opts = {
    //     tabs: [{
    //         name: '',
    //         template?: '',
    //         element?: '',
    //         component?: '',
    //         disabled: false,
    //     }],
    //
    //     active: 1,
    //     disabled: [2, 3]
    // }

    @Input('mnOptions')
    set options_(opts) {
        mu.run(mu.type(opts.template, 'object'), () => {
            opts._temp = opts.template;
            mu.remove(opts, 'template');
        });

        this._options = opts;
    }

    @Input('mnActive')
    set active_(val) {
        this._options.active = val;
    }

    @ContentChildren(MnTabComponent)
    set tabs_(tabs) {
        mu.run(tabs._results, (rst) => {
            this._options.tabs = mu.map(rst, (tab) => {
                return tab._options;
            });
        });
    }

    @Output('mnResult') _result: any = new EventEmitter<any>();
    @Output('mnSelected') _selected: any = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    _actived(key, inx, tab, tabs) {

        key = key || 0;

        if (key === tab.key || key === inx) {

            this._result.emit({
                tab,
                index: inx,
                key
            });

            return true;
        }

        if (tabs.find((o, inx) => o.key === key || inx === key)) {
            return false;
        }

        let rst = inx === 0;

        if (rst) {
            this._result.emit({
                tab: tabs[0],
                index: inx,
                key
            });
        }
        return rst;
    }

    _clickTabTitle(tab, inx) {
        this._options.active = tab.key || inx;
        this._selected.emit({
            tab,
            index: inx,
            key: tab.key
        });
    }
}
