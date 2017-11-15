import {Component, EventEmitter, Input, OnChanges, OnInit} from '@angular/core';
import {MnDate} from './mn-date.class';

declare const mu: any;

@Component({
    selector: 'mn-datetimepicker',
    template: `
        <mn-dropdown (mnResult)="_dropDownResult = $event">
            <mn-fill>
                <mn-input
                        class="mnc-col"
                        [style.minWidth.px]="95"
                        [mnReadonly]="true"
                        [mnValue]="_selected?.start">
                    <span class="mnc-next">-</span>
                </mn-input>
                <mn-input
                        class="mnc-col"
                        [style.minWidth.px]="105"
                        [mnReadonly]="true"
                        [mnValue]="_selected?.end">
                    <i class="fa fa-calendar mnc-next"></i>
                </mn-input>
            </mn-fill>

            <mn-dropdown-content class="p-8 mnc-block">
                <mn-fill [style.width.px]="760">
                    <mn-col [style.width.px]="120">
                        <mn-datetimeranges
                                [mnViews]="_views"
                                (mnResult)="_rangeResult($event)"
                        ></mn-datetimeranges>
                    </mn-col>
                    <mn-col [span]="1">
                        <ng-container *ngIf="_view === 'calendar'">
                            <mn-calendar-multiple
                                    [mnStartDate]="_startDate"
                                    [mnEndDate]="_endDate"
                                    [mnMinDate]="_minDate"
                                    [mnMaxDate]="_maxDate"
                                    (mnResult)="_mcmResult($event)"
                            ></mn-calendar-multiple>
                        </ng-container>

                        <ng-container *ngIf="_view === 'year'">
                            <mn-yearspicker
                                    [mnStartDate]="_startDate"
                                    [mnEndDate]="_endDate"
                                    [mnMinDate]="_minDate"
                                    [mnMaxDate]="_maxDate"
                                    (mnResult)="_mcmResult($event)"
                            ></mn-yearspicker>
                        </ng-container>

                        <ng-container *ngIf="_view === 'month'">
                            <mn-monthspicker
                                    [mnStartDate]="_startDate"
                                    [mnEndDate]="_endDate"
                                    [mnMinDate]="_minDate"
                                    [mnMaxDate]="_maxDate"
                                    (mnResult)="_mcmResult($event)"
                            ></mn-monthspicker>
                        </ng-container>

                        <ng-container *ngIf="_view === 'quarter'">
                            <mn-quarterspicker
                                    [mnStartDate]="_startDate"
                                    [mnEndDate]="_endDate"
                                    [mnMinDate]="_minDate"
                                    [mnMaxDate]="_maxDate"
                                    (mnResult)="_mcmResult($event)"
                            ></mn-quarterspicker>
                        </ng-container>

                        <mn-fill class="mt-8">
                            <mn-col [span]="1" class="pt-2 mnc-mark">
                                {{_viewed.startDate?._date | mu: 'format' : _viewsMap[_view] }}
                                <ng-container *ngIf="_viewed.startDate">-</ng-container>
                                {{_viewed.endDate?._date | mu: 'format' : _viewsMap[_view] }}
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
        this._minDate = new MnDate(date);
    }

    @Input('mnMaxDate')
    set maxDate(date) {
        this._maxDate = new MnDate(date);
    }

    // 设置视图
    @Input('mnViews')
    views(items) {
        if (!items) {
            return;
        }

        this._views = mu.map(items, (item, index) => {
            if (mu.type(item, 'string')) {
                let [view, formatter] = item.split('-:>');
                formatter = formatter || 'yyyy-MM-dd';
                item = {
                    view,
                    formatter
                };
            }

            if (!index) {
                this._view = item.view;
            }

            return item;
        });
    }

    /**
     * boolean: def true, 是否打开快速选择区
     * any: exist true, 快速选择区配置 {relatively, absolute}
     */
    @Input('mnQuicks') quicks: boolean | any;
    @Input('mnResult') result: any = new EventEmitter<any>();
    @Input('mnSelected') selected: any = new EventEmitter<any>();

    _startDate: any;
    _endDate: any;
    _maxDate: any;
    _minDate: any;
    _selected: any = {};

    _viewed: any = {
        startDate: {},
        endDate: {}
    };

    _hasChange: boolean = false;

    // 默认视图
    _view: string = 'calendar';
    _views: any[] = [
        {
            view: 'calendar',
            formatter: 'yyyy-MM-dd'
        }, {
            view: 'month',
            formatter: 'yyyy-MM-dd'
        }, {
            view: 'quarter',
            formatter: 'yyyy-MM-dd'
        }, {
            view: 'year',
            formatter: 'yyyy-MM-dd'
        }

    ];
    _viewsMap: any;

    _rangeResult(rst) {
        this._startDate = rst.startDate || this._viewed.startDate || this._selected.startDate;
        this._endDate = rst.endDate || this._viewed.endDate || this._selected.endDate;
        mu.run(rst.view, (view) => this._view = view);
    }

    _dropDownResult: any;

    constructor() {
    }

    ngOnInit() {
        this._viewsMap = mu.map(this._views, (o) => {
            return {
                __key__: o.view,
                __val__: o.formatter
            };
        }, {});
    }

    _mcmResult($event: any) {
        mu.run($event.startDate, () => {
            this._viewed.startDate = $event.startDate.clone();
        });

        mu.run($event.endDate, () => {
            this._viewed.endDate = $event.endDate.clone();
        });

        // this._startDate = $event.startDate;
        // this._endDate = $event.endDate;
        if (!this._hasChange) {
            // Hack fixed angular error
            // ERROR Error:
            //      ExpressionChangedAfterItHasBeenCheckedError:
            //      Expression has changed after it was checked
            // public ngDoCheck(): void { this.cdr.detectChanges(); }
            setTimeout(() => {
                mu.run(this._startDate, () => {
                    this._selected = {
                        startDate: this._startDate,
                        endDate: this._endDate,
                        start: this._format(this._startDate),
                        end: this._format(this._endDate)
                    };
                });
            }, 0);
            this._hasChange = true;
        }

        this.result.emit($event);
    }

    // 确认事件
    _confirmDate() {
        this._startDate = this._viewed.startDate;
        this._endDate = this._viewed.endDate;

        this._selected = {
            startDate: this._startDate,
            endDate: this._endDate,
            start: this._format(this._startDate),
            end: this._format(this._endDate)
        };
        this.selected.emit(this._selected);
        this._dropDownResult.hide();
    }

    _format(date: any): string {
        if (!date) {
            return '';
        }
        return mu.format(date._date, this._viewsMap[this._view]);
    }
}
