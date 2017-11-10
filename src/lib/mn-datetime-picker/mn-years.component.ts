import {Component, Input, OnInit} from '@angular/core';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';

declare const mu: any;

@Component({
    selector: 'mn-yearpicker',
    template: `
        <section *ngFor="let century of calendar">
            <h5>{{century.century}}st</h5>
            <ng-container *ngFor="let tenYears of century.years">
                <mn-fill *ngIf="(_tenshow[tenYears[0]._ten] || 0) !== 10">
                    <ng-container *ngFor="let year of tenYears">
                        <mn-col *ngIf="year.show || _tenshow[year._ten] < 10" [span]="2">
                            {{year.show ? year.years.year : ''}}
                        </mn-col>
                    </ng-container>
                </mn-fill>
            </ng-container>
        </section>
    `
})
export class MnYearsComponent implements OnInit {
    @Input('mnMaxDate')
    set _maxDate(value) {
        this.maxDate = new MnDate(value);
    }

    @Input('mnMinDate')
    set _minDate(value) {
        this.minDate = new MnDate(value);
    }

    @Input('mnStartDate')
    set _startDate(value) {
        let startDate = new MnDate(value);
        this.startDate = this._mds.reStartDate(startDate, this.maxDate, this.minDate);
    }

    @Input('mnEndDate')
    set _endDate(value) {
        if (!this.startDate) {
            console.warn('startDate and endDate must exist at the same time');
        }
        let endDate = new MnDate(value);
        this.endDate = this._mds.reEndDate(endDate, this.maxDate, this.minDate);
    }

    @Input('mnDate')
    set _date(value) {
        if (this.startDate || this.endDate) {
            console.warn('startDate or endDate can not exist with the date');
        }

        let date = new MnDate(value);
        this.startDate = new MnDate(date.years.start);
        this.endDate = new MnDate(date.years.end);
    }

    current: any = new MnDate(new Date());

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
        if (!(this.endDate && this.startDate)) {
            this.startDate = new MnDate(this.current.years.start);
            this.endDate = new MnDate(this.current.years.end);
        }

        let _start_century = Math.floor(this.startDate.years.year / 100);
        let _end_century = Math.floor(this.endDate.years.year / 100);

        for (let i = _start_century; i <= _end_century; i++) {
            this.calendar.unshift({
                century: i + 1,
                years: this.getCenturyYears(i)
            });
        }

        console.debug(this.calendar, this._tenshow);
    }

    calendar: any[] = [];
    startDate: any;
    endDate: any;
    maxDate: any;
    minDate: any;

    _tenshow = {};

    getCenturyYears(century: number) {
        return mu.map(10, (i, index) => {
            let _ten_show = false;
            return mu.map(10, (_i, _index) => {
                let year = century + mu.leftpad((10 * index + _index), 2);
                let _mndate: any = new MnDate(year);

                _mndate.show = true;

                if (this.minDate) {
                    _mndate.show = _mndate.years.start > this.minDate._ts;
                }

                if (this.maxDate) {
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
}
