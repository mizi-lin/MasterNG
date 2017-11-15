import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';

declare const mu: any;

@Component({
    selector: 'mn-quarterspicker',
    template: `
        <ng-container *ngFor="let year of calendar">
            <mn-fill [gutter]="2">
                <ng-container *ngFor="let quarter of year.quarters">
                    <mn-col [span]="2"
                            [class.no-selected]="!quarter.show"
                            [class.start]="started(quarter)"
                            [class.end]="ended(quarter)"
                            [class.range]="ranged(quarter)"
                            [class.range-reverse]="reverseRanged(quarter)"
                            (mouseover)="hovered(quarter)"
                            (click)="selected(quarter)">
                        <div class="mnc-quarterspicker-name">{{quarter.quarters.name}}</div>
                        <div class="mnc-quarterspicker-year">{{quarter.quarters.year}}Q{{quarter.quarters.quarter}}</div>
                    </mn-col>
                </ng-container>
            </mn-fill>
        </ng-container>
    `
})
export class MnQuartersPickerComponent implements OnInit {
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
    }

    @Output('mnResult') result: any = new EventEmitter<any>();

    current: any = new MnDate(new Date());

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
        // 设置startDate, endDate 默认值
        if (!(mu.isNotEmpty(this.endDate) && mu.isNotEmpty(this.startDate))) {
            this.startDate = new MnDate(this.current.quarters.start);
            this.endDate = new MnDate(this.current.quarters.end);
        }

        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.minDate)) {
            let minDate = this.startDate.yoy(-3);
            this.minDate = new MnDate(minDate.start);
        }

        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.maxDate)) {
            let maxDate = this.endDate.yoy(2);
            this.maxDate = new MnDate(maxDate.start);
        }

        this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));

        let _start_years = this.minDate.quarters.year;
        let _end_years = this.maxDate.quarters.year;

        for (let i = _start_years; i <= _end_years; i++) {
            this.calendar.unshift({
                year: i,
                quarters: this.getQuartersByYear(i)
            });
        }
    }

    calendar: any[] = [];
    startDate: any;
    endDate: any;
    maxDate: any;
    minDate: any;

    _tenshow = {};
    _hoverDate: any;

    getQuartersByYear(year: number) {
        return mu.map(4, (i, index) => {
            let _sm = 12 - (i * 3) + 1;
            let _year_month = year + '-' + mu.leftpad(_sm, 2);

            let _mndate: any = new MnDate(_year_month);
            _mndate.show = true;

            if (this.minDate) {
                _mndate.show = _mndate.quarters.start > this.minDate._ts;
            }

            if (this.maxDate && _mndate.show) {
                _mndate.show = _mndate.quarters.end < this.maxDate._ts;
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
                if (date.quarters.start < this.startDate.quarters.end) {
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
            return date.show && date.quarters.start === mu.prop(this.startDate, 'quarters.start');
        });
    }

    ended(date) {
        return mu.run(this.endDate, () => {
            return date.show && date.quarters.end === mu.prop(this.endDate, 'quarters.end');
        });
    }

    /**
     * 判断时间区间
     * @param date
     */
    ranged(date) {
        let endDate = mu.ifempty(this.endDate, this._hoverDate);
        if (this.startDate && endDate) {
            return date.show && this.startDate.quarters.end < date.quarters.start && date.quarters.start < endDate.quarters.end;
        }
    }

    /**
     * 反向日期显示
     * @param date
     * @return {boolean}
     */
    reverseRanged(date) {
        if (this.startDate && this._hoverDate && !this.endDate) {
            return date.show && this.startDate.quarters.end > date.quarters.start && date.quarters.end > this._hoverDate.quarters.start;
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
            return new MnDate(end.quarters.end);
        });

        return {
            startDate: _startDate,
            endDate: endDate,
            first: first,
        };
    }
}
