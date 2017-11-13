import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MnDatetimeServices} from './mn-datetime.services';

@Component({
    selector: 'mn-datetime-quick',
    template: `
        <mn-fill [hph]="false">
            <mn-col
                    [class.active]="status === 'relatively'"
                    [span]="1"
                    (click)="status ='relatively'">相对
            </mn-col>
            <mn-col [class.active]="status === 'absolute'"
                    [span]="1"
                    (click)="status ='absolute'">绝对
            </mn-col>
        </mn-fill>

        <div class="mt-16">
            <section [class.active]="status === 'relatively'">
                <ol>
                    <li (click)="getDate({
                        name: '本月', value: '1:M'
                    })">本月</li>
                    <li *ngFor="let rl of _relatively" (click)="getDate(rl)">
                        {{rl.name}}
                    </li>
                </ol>
            </section>

            <section [class.active]="status === 'absolute'">
                <ol>
                    <li (click)="selectView('year')">按年</li>
                    <li (click)="selectView('quarter')">按季度</li>
                    <li (click)="selectView('month')">按月</li>
                    <li (click)="selectView('week')">按周</li>
                    <li *ngFor="let ab of _absolute">
                        {{ab.name}}
                    </li>
                </ol>
            </section>
        </div>

        <button mn-btn class="primary full" (click)="selectView('calendar')">自定义日期</button>
    `
})
export class MuDatetimeQuickComponent implements OnInit {
    status: string = 'relatively';

    // {
    //     relatively: [],
    //     absolute: [],
    //     status: 'relatively'
    // }

    _relatively: any;
    _absolute: any;

    @Input()
    set mnQuick(o) {
        o = o || {};
        this._relatively = o.relatively;
        this._absolute = o._absolute;
    }

    @Output('mnResult') result: any = new EventEmitter<any>();

    constructor(
        private _mds: MnDatetimeServices
    ) {
    }

    ngOnInit() {
    }

    getDate(rule) {
        let range = this._mds.getRangeDate(rule.value);
        this.result.emit(range);
    }

    selectView(_view: string) {
        this.result.emit({
            view: _view
        });
    }
}
