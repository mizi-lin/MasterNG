import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {MnDate} from './mn-date.class';

@Component({
    selector: 'mn-datesingle',
    template: `
        <div class="content">
            {{_date[_view].value}}
        </div>
    `
})
export class MnDateSingleComponent implements OnInit {

    _date: any;

    @Input('MnDate')
    set date_(date) {
        if (date) {
            this._date = new MnDate(date);
        }
    }

    @Input('MnView') _view: string = 'days';

    _maxDate: any;

    @Input('MnMaxDate')
    set maxDate_(date) {

    }

    _minDate: any;

    @Input('MnMinDate')
    set minDate_(date) {

    }

    _startDate: any;

    @Input('MnStartDate')
    set startDate_(date) {

    }

    _endDate: any;

    @Input('MnEndDate')
    set endDate_(date) {

    }

    _hovedDate: any;
    @Input('MnHoverDate')
    set hoverDate_(date) {

    }

    @HostBinding('class.start')
    get classStart_() {
        return true;
    }

    @HostBinding('class.end')
    get classEnd_() {
        return true;
    }

    @HostBinding('class.range')
    get classRange_() {
        return true;
    }

    @HostBinding('class.range-reverse')
    get classRangeReverse_() {
        return true;
    }

    constructor() {
    }

    ngOnInit() {
    }
}
