import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MnDatetimeServices} from './mn-datetime.services';

import  mu from 'mzmu';

@Component({
    selector: 'mn-datetimeranges',
    template: `
        <mn-fill [hph]="false" class="mnc-header">
            <mn-col *ngIf="_ranges.length"
                    [class.active]="_type === 'range'"
                    [span]="1"
                    (click)="_type ='range'">Range
            </mn-col>
            <mn-col *ngIf="_views.length"
                    [class.active]="_type === 'view'"
                    [span]="1"
                    (click)="_type ='view'">View
            </mn-col>
        </mn-fill>

        <div class="mt-8">
            <section [class.active]="_type === 'range'">
                <ol>
                    <li *ngFor="let rl of _ranges" (click)="getDate(rl)">
                        {{rl.name}}
                    </li>
                </ol>
            </section>

            <section [class.active]="_type === 'view'">
                <ol>
                    <li *ngFor="let _v of _views" 
                        [class.selected]="_view === _v.view"
                        (click)="selectView(_v.view)">
                        By {{_v.view}}
                    </li>
                </ol>
            </section>
        </div>

        <!--<button mn-btn class="default mn-btn-full mt-8"-->
                <!--[class.primary]="_view === 'calendar'"-->
                <!--(click)="selectView('calendar')">Custom Date</button>-->
    `
})
export class MuDatetimeRangesComponent implements OnInit {

    _type: string = 'range';

    @Input('mnRanges') _ranges: any[] = [];

    @Input('mnViews') _views: any[];

    @Input('mnType')
    set type(_type) {
        this._type = _type;

    }

    @Output('mnResult') result: any = new EventEmitter<any>();
    @Output('mnSelected') selected: any = new EventEmitter<any>();

    _view: string = 'calendar';

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
        mu.run(() => {
            if (!this._ranges.length) {
                this._type = 'view';
            }
            if (!this._views.length) {
                this._type = 'range';
            }
        });

        mu.run(this._views, () => this._view = this._views[0].view);
    }

    getDate(rule) {
        let range = this._mds.getRangeDate(rule.value);
        this.result.emit(range);
        this.selected.emit(range);
    }

    selectView(_view: string) {
        let rst = {
            view: _view
        };
        this._view = _view;
        this.result.emit(rst);
        this.selected.emit(rst);
    }
}
