import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MnDate} from './mn-date.class';

@Component({
    selector: 'mn-datetimepicker',
    template: `
        <mn-dropdown (mnResult)="_dropDownResult = $event">
            <div>
                <input type="text" [value]="_selected?.startDate?.date" />
                <input type="text" [value]="_selected?.endDate?.date" />
            </div>
            
            <mn-dropdown-content class="p-8 mnc-block">
                <mn-fill [style.width.px]="720">
                    <mn-col [style.width.px]="120">
                        <mn-datetime-quick
                                [mnQuick]="quicks"
                                (mnResult)="_quickResult($event)"
                        ></mn-datetime-quick>
                    </mn-col>
                    <mn-col [span]="1">
                        <mn-calendar-multiple
                                [mnStartDate]="_startDate"
                                [mnEndDate]="_endDate"
                                [mnMinDate]="'2015-06-11'"
                                [mnMaxDate]="'2027-11-16'"
                                (mnResult)="_mcmResult($event)"
                        ></mn-calendar-multiple>
                        
                        <mn-fill class="mt-8">
                            <mn-col [span]="1" class="pt-2 mnc-mark">
                                {{_startDate?.date}} - {{_endDate?.date}}
                            </mn-col>
                            <mn-col [style.width.px]="120" class="mnc-tr">
                                <button mn-btn class="primary" (click)="_confirmDate()">确认</button>
                            </mn-col>
                        </mn-fill>
                    </mn-col>
                </mn-fill>
            </mn-dropdown-content>
        </mn-dropdown>
    `
})
export class MnDatetimePickerComponent implements OnInit {

    /**
     * 单日历视图 single
     * 多日历视图 multiple
     */
    @Input('mnMode') mode: string;

    /**
     * string: 标准的日期格式 '2017-12-08 11:05:28'
     * number: 时间戳
     * any: mndate 对象
     */
    @Input('mnStartDate')
    set startDate(date) {
        this._selected.startDate = date;
        this._startDate = date;
    }

    @Input('mnEndDate')
    set endDate(date) {
        this._selected.endDate = date;
        this._endDate = date;
    }

    @Input('mnMinDate')
    set minDate(date) {
        this._minDate = date;
    }

    @Input('minMaxDate')
    set maxDate(date) {
        this._maxDate = date;
    }

    /**
     * boolean: def true, 是否打开快速选择区
     * any: exist true, 快速选择区配置 {relatively, absolute}
     */
    @Input('mnQuicks') quicks: boolean | any;
    @Input('mnResult') result: any = new EventEmitter<any>();
    @Input('mnSelected') selected: any = new EventEmitter<any>();
    @Input('mnFormatter') format: string = 'yyyy-MM-dd';

    _startDate: any;
    _endDate: any;
    _maxDate: any;
    _minDate: any;
    _selected: any;

    _quickResult(rst) {
        this._startDate = rst.startDate;
        this._endDate = rst.endDate;
    }

    _dropDownResult: any;

    abc: any = new MnDate('2017-07-18 13:19:56');

    constructor() {
        console.debug(this.abc);
    }

    ngOnInit() {
    }

    _mcmResult($event: any) {
        this._startDate = $event.startDate;
        this._endDate = $event.endDate;
        this.result.emit($event);
    }

    // 确认事件
    _confirmDate() {
        this._selected = {
            startDate: this._startDate,
            endDate: this._endDate
        };

        this.selected.emit(this._selected);
        this._dropDownResult.hide();
    }
}
