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
export class MnDateSingleComponent implements OnInit {

    _date: any;

    @Input('MnDate')
    set date_(date) {
        if (date) {
            this._date = new MnDate(date);
        }
    }

    @Input('MnView') _view: string = 'days';

    @HostBinding('class.start')
    get classStart_() {

        if (this._startDate) {
            return true;
        }

        return false;
    }

    @HostBinding('class.end')
    get classEnd_() {
        if (this._endDate) {
            return true;
        }

        return false;
    }

    @HostBinding('class.range')
    get classRange_() {
        return true;
    }

    @HostBinding('class.range-reverse')
    get classRangeReverse_() {
        return true;
    }

    _hoverDate: any;
    _startDate: any;
    _endDate: any;
    _maxDate: any;
    _minDate: any;

    constructor(private _mds: MnDatetimeServices) {
        _mds.date$.subscribe((rst: any = {}) => {
            this._hoverDate = rst._hoverDate;
            this._startDate = rst._startDate;
            this._endDate = rst._endDate;
            this._maxDate = rst._maxDate;
            this._minDate = rst._minDate;

            console.log(this._startDate);
        });
    }

    ngOnInit() {

        setTimeout(() => {
            this._mds.setDate({
                _startDate: '2017-09-08'
            });
        }, 5000);

    }
}
