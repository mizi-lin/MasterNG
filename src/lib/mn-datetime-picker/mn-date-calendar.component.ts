import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';

@Component({
    selector: 'mn-datesingle',
    template: `
        <div class="content">
            {{_date[_view].value}}
        </div>
    `
})
export class MnDateCalendarComponent implements OnInit {

    _date: any;

    @Input('mnDate')
    set date_(date) {
        if (date) {
            this._date = new MnDate(date);
        }
    }

    _view: string = 'days';
    @Input('mnView')
    set view_(view) {
        this._view = view;
        this._calendar = this._mds.getCalendar(this._date, view);
    }

    _maxDate: any;

    @Input('mnMaxDate')
    set maxDate_(date) {

    }

    _minDate: any;

    @Input('mnMinDate')
    set minDate_(date) {

    }

    _startDate: any;

    @Input('mnStartDate')
    set startDate_(date) {

    }

    _endDate: any;

    @Input('mnEndDate')
    set endDate_(date) {

    }


    // 日历视图
    _calendar: any = [];

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
    }
}
