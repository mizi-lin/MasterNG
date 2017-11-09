import {Component, EventEmitter, Input, OnChanges, OnInit} from '@angular/core';
import {MnDate} from './mn-date.class';

@Component({
    selector: 'mn-datetimepicker',
    template: `
        <mn-dropdown (mnResult)="_dropDownResult = $event">
            <mn-fill>
                <mn-input
                        class="mnc-col"
                        [style.minWidth.px]="95"
                        [mnValue]="_selected['startDate']['_date'] | mu: 'format' : formatter">
                    <span class="mnc-next">-</span>
                </mn-input>
                <mn-input
                        class="mnc-col"
                        [style.minWidth.px]="100"
                        [mnValue]="_selected?.endDate?._date | mu: 'format' : formatter">
                    <i class="fa fa-calendar mnc-next"></i>
                </mn-input>
            </mn-fill>
            

            <!--<input type="text" [value]="(_selected?.startDate?._date | mu: 'format' : formatter) || ''" />-->
            <!--<input type="text" [value]="(_selected?.endDate?._date | mu: 'format' : formatter) || ''" />-->

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
                                [mnMinDate]="_minDate"
                                [mnMaxDate]="_maxDate"
                                (mnResult)="_mcmResult($event)"
                        ></mn-calendar-multiple>

                        <mn-fill class="mt-8">
                            <mn-col [span]="1" class="pt-2 mnc-mark">
                                {{_startDate?._date | mu: 'format' : formatter }} - {{_endDate?._date | mu: 'format' : formatter }}
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
        this._startDate = new MnDate(date);
    }

    @Input('mnEndDate')
    set endDate(date) {
        this._endDate = new MnDate(date);
    }

    @Input('mnMinDate')
    set minDate(date) {
        this._minDate = date;
    }

    @Input('mnMaxDate')
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
    @Input('mnFormatter') formatter: string = 'yyyy-MM-dd';

    _startDate: any;
    _endDate: any;
    _maxDate: any;
    _minDate: any;
    _selected: any = {
        startDate: {},
        endDate: {}
    };

    _hasChange: boolean = false;

    _quickResult(rst) {
        this._startDate = rst.startDate;
        this._endDate = rst.endDate;
    }

    _dropDownResult: any;

    constructor() {
    }

    ngOnInit() {
    }

    _mcmResult($event: any) {
        this._startDate = $event.startDate;
        this._endDate = $event.endDate;

        if (!this._hasChange) {
            // Hack fixed angular error
            // ERROR Error:
            //      ExpressionChangedAfterItHasBeenCheckedError:
            //      Expression has changed after it was checked
            // public ngDoCheck(): void { this.cdr.detectChanges(); }
            setTimeout(() => {
                this._selected.startDate = this._startDate;
                this._selected.endDate = this._endDate;
            }, 0);
            this._hasChange = true;
        }

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
