import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';

declare const mu: any;

@Component({
    selector: 'mn-monthspicker',
    template: `
        <ng-container *ngFor="let year of calendar">
            <mn-fill [gutter]="2">
                <ng-container *ngFor="let month of year.months">
                    <mn-col [span]="2"
                            [class.no-selected]="!month.show"
                            [class.start]="started(month)"
                            [class.end]="ended(month)"
                            [class.range]="ranged(month)"
                            [class.range-reverse]="reverseRanged(month)"
                            (mouseover)="hovered(month)"
                            (click)="selected(month)">
                        <div class="mnc-monthspicker-month">{{month.months.month | mu:'leftpad':2}}</div>
                        <div class="mnc-monthspicker-year">{{month.months.year}}</div>
                    </mn-col>
                </ng-container>
            </mn-fill>
        </ng-container>
    `
})
export class MnMonthsPickerComponent implements OnInit {
    @Input('mnMaxDate')
    set _maxDate(value) {
        if (value) {
            this.maxDate = new MnDate(value);
        }
    }

    @Input('mnMinDate')
    set _minDate(value) {
        if (value) {
            this.minDate = new MnDate(value);
        }
    }

    @Input('mnStartDate')
    set _startDate(value) {
        if (value) {
            let startDate = new MnDate(value);
            this.startDate = this._mds.reStartDate(startDate, this.maxDate, this.minDate);
        }
    }

    @Input('mnEndDate')
    set _endDate(value) {
        if (!value) {
            return;
        }

        if (!this.startDate) {
            console.warn('startDate and endDate must exist at the same time');
        }
        let endDate = new MnDate(value);
        this.endDate = this._mds.reEndDate(endDate, this.maxDate, this.minDate);
        this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));
    }

    @Input('mnDate')
    set _date(value) {
        if (this.startDate || this.endDate) {
            console.warn('startDate or endDate can not exist with the date');
        }

        let date = new MnDate(value);
        this.startDate = new MnDate(date.months.start);
        this.endDate = new MnDate(date.months.end);

        this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));
    }

    @Output('mnResult') result: any = new EventEmitter<any>();

    current: any = new MnDate(new Date());

    constructor(private _mds: MnDatetimeServices) {

        // let a = '56,99,66,57,55,55,75,57,71,107,69,59,31,67,76,36,78'.split(',');
        //
        // let b = 0;
        //
        // mu.each(a, c => b = b + parseInt(c));
        //
        // console.debug(b);

    }

    ngOnInit() {
        // 设置startDate, endDate 默认值
        if (!(this.endDate && this.startDate)) {
            this.startDate = new MnDate(this.current.months.start);
            this.endDate = new MnDate(this.current.months.end);
        }

        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.minDate)) {
            let minDate = this.startDate.yoy(-3);
            this.minDate = new MnDate(minDate.start);
        }

        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.maxDate)) {
            let maxDate = this.endDate.yoy(1);
            this.maxDate = new MnDate(maxDate.start);
        }

        let _start_years = this.minDate.months.year;
        let _end_years = this.maxDate.months.year;

        for (let i = _start_years; i <= _end_years; i++) {
            this.calendar.unshift({
                year: i,
                months: this.getMonthsByYear(i)
            });
        }

        console.debug(this.calendar, this.minDate, this.maxDate);
    }

    calendar: any[] = [];
    startDate: any;
    endDate: any;
    maxDate: any;
    minDate: any;

    _tenshow = {};
    _hoverDate: any;

    getMonthsByYear(year: number) {
        return mu.map(12, (i, index) => {
            let _year_month = year + '-' + mu.leftpad(13 - i, 2);

            let _mndate: any = new MnDate(_year_month);
            _mndate.show = true;

            if (this.minDate) {
                _mndate.show = _mndate.months.start > this.minDate._ts;
            }

            if (this.maxDate && _mndate.show) {
                _mndate.show = _mndate.months.end < this.maxDate._ts;
            }

            return _mndate;
        }, []);
    }

    selected(date) {
        if (!date.show) {
            return;
        }

        mu.run(this.startDate, () => {
            mu.run(this.endDate, () => {
                this.startDate = date;
                this.endDate = void 0;
            }, () => {
                if (date.months.start < this.startDate.months.end) {
                    this.endDate = this.startDate;
                    this.startDate = date;
                } else {
                    this.endDate = date;
                }
            });
        }, () => {
            this.startDate = date;
        });

        this.result.emit(this.backStartEnd(this.startDate, this.endDate, false));
    }

    hovered(date) {
        this._hoverDate = date;
    }

    started(date) {
        return mu.run(this.startDate, () => {
            return date.show && date.months.start === mu.prop(this.startDate, 'months.start');
        });
    }

    ended(date) {
        return mu.run(this.endDate, () => {
            return date.show && date.months.start === mu.prop(this.endDate, 'months.start');
        });
    }

    /**
     * 判断时间区间
     * @param date
     */
    ranged(date) {
        let endDate = mu.ifempty(this.endDate, this._hoverDate);
        if (this.startDate && endDate) {
            return date.show && this.startDate.months.end < date.months.start && date.months.start < endDate.months.end;
        }
    }

    /**
     * 反向日期显示
     * @param date
     * @return {boolean}
     */
    reverseRanged(date) {
        if (this.startDate && this._hoverDate && !this.endDate) {
            return date.show && this.startDate.months.end > date.months.start && date.months.end > this._hoverDate.months.start;
        }
    }

    backStartEnd(_startDate: any, _endDate: any, first: boolean) {
        // let startDate = _startDate.months.start;
        // // _endDate = _endDate || _startDate;
        // // let endDate = _endDate.years.end;
        //

        // let endDate = _endDate ? new MnDate(_endDate.months.end) : void 0;

        let endDate = mu.run(_endDate, (_end) => {
            let end = _end.clone();
            return new MnDate(end.months.end);
        });

        return {
            startDate: _startDate,
            endDate: endDate,
            first: first,
        };
    }
}
