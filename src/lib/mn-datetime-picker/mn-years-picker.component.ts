import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';
import {MnLoggerService} from '../mn-common/services/mn-logger.service';

import  mu from 'mzmu';

@Component({
    selector: 'mn-yearspicker',
    template: `
        <section *ngFor="let century of calendar">
            <!--<h5>{{century.century}}st</h5>-->
            <ng-container *ngFor="let tenYears of century.years">
                <mn-fill *ngIf="(_tenshow[tenYears[0]._ten] || 0) !== 10" [gutter]="2">
                    <ng-container *ngFor="let year of tenYears">
                        <mn-col *ngIf="year.show || _tenshow[year._ten] < 10" [span]="2"
                                [class.no-selected]="!year.show"
                                [class.start]="started(year)"
                                [class.end]="ended(year)"
                                [class.range]="ranged(year)"
                                [class.range-reverse]="reverseRanged(year)"
                                (mouseover)="hovered(year)"
                                (click)="selected(year)">
                            {{year.years.year}}
                        </mn-col>
                    </ng-container>
                </mn-fill>
            </ng-container>
        </section>
    `
})
export class MnYearsPickerComponent implements OnInit {
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
            this._logger.warn('startDate and endDate must exist at the same time');
        }
        let endDate = new MnDate(value);
        this.endDate = this._mds.reEndDate(endDate, this.maxDate, this.minDate);

        this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));
    }

    @Input('mnDate')
    set _date(value) {
        if (this.startDate || this.endDate) {
            this._logger.warn('startDate or endDate can not exist with the date');
        }

        let date = new MnDate(value);
        this.startDate = new MnDate(date.years.start);
        this.endDate = new MnDate(date.years.end);
    }

    @Output('mnResult') result: any = new EventEmitter<any>();

    current: any = new MnDate(new Date());

    constructor(private _logger: MnLoggerService,
                private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
        // 设置startDate, endDate 默认值
        if (!(mu.isNotEmpty(this.endDate) && mu.isNotEmpty(this.startDate))) {
            this.startDate = new MnDate(this.current.years.start);
            this.endDate = new MnDate(this.current.years.end);
        }

        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.minDate)) {
            let _y = (this.startDate.years.year % 10 + 21);
            let minDate = this.startDate.yoy(-_y);
            this.minDate = new MnDate(minDate.start);
        }

        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.maxDate)) {
            let _y = (10 - this.endDate.years.year % 10 + 20);
            let maxDate = this.endDate.yoy(_y);
            this.maxDate = new MnDate(maxDate.start);
        }

        this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));

        let _start_century = Math.floor(this.minDate.years.year / 100);
        let _end_century = Math.floor(this.maxDate.years.year / 100);

        for (let i = _start_century; i <= _end_century; i++) {
            this.calendar.unshift({
                century: i + 1,
                years: this.getCenturyYears(i)
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

    getCenturyYears(century: number) {
        return mu.map(10, (i, index) => {
            let _ten_show = false;
            return mu.map(10, (_i, _index) => {
                let year = century + mu.leftpad(99 - (10 * index + _index), 2);
                let _mndate: any = new MnDate(year);

                _mndate.show = true;

                if (this.minDate) {
                    _mndate.show = _mndate.years.start > this.minDate._ts;
                }

                if (this.maxDate && _mndate.show) {
                    _mndate.show = _mndate.years.end < this.maxDate._ts;
                }

                _mndate._ten = Math.floor(year / 10);

                if (!_mndate.show) {
                    this._tenshow[_mndate._ten] = (this._tenshow[_mndate._ten] || 0) + 1;
                }

                return _mndate;
            }, []);
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
                if (date.years.start < this.startDate.years.end) {
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
            return date.show && date.years.start === mu.prop(this.startDate, 'years.start');
        });
    }

    ended(date) {
        return mu.run(this.endDate, () => {
            return date.show && date.years.start === mu.prop(this.endDate, 'years.start');
        });
    }

    /**
     * 判断时间区间
     * @param date
     */
    ranged(date) {
        let endDate = mu.ifempty(this.endDate, this._hoverDate);
        if (this.startDate && endDate) {
            return date.show && this.startDate.years.end < date.years.start && date.years.start < endDate.years.end;
        }
    }

    /**
     * 反向日期显示
     * @param date
     * @return {boolean}
     */
    reverseRanged(date) {
        if (this.startDate && this._hoverDate && !this.endDate) {
            return date.show && this.startDate.years.end > date.years.start && date.years.end > this._hoverDate.years.start;
        }
    }

    backStartEnd(_startDate: any, _endDate: any, first: boolean) {
        let startDate = mu.isNotEmpty(_startDate) ? new MnDate(_startDate.years.start) : void 0;
        let endDate = mu.isNotEmpty(_endDate) ? new MnDate(_endDate.years.end) : void 0;
        return {
            startDate,
            endDate,
            first: first,
        };
    }
}
