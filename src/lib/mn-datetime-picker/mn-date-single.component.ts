import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';

declare const mu: any;

/**
 * 日历控件最小模块：日期块
 * 最小时间粒度，实现时间样式（max, min, start, end)
 *
 */


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
        return mu.run(this._rst._startDate, (_startDate) => {
            this._startDate = this.mndate(_startDate);
            this._endDate = void 0;
            return this.compared(this._date, this._startDate) === 0;
        });
    }

    @HostBinding('class.end')
    get classEnd_() {
        return mu.run(this._rst._endDate, (_endDate) => {
            this._endDate = this.mndate(_endDate);
            return this.compared(this._date, this._endDate) === 0;
        });
    }

    @HostBinding('class.range')
    get classRange_() {
        return mu.run(this._rst._hoverDate, (_hoverDate) => {
            this._hoverDate = this.mndate(_hoverDate);
            return this.compared(this._date, this._hoverDate) === 1;
        });
    }

    @HostBinding('class.range-reverse')
    get classReverseRange_() {
        return mu.run(this._rst._hoverDate, (_hoverDate) => {
            this._hoverDate = this.mndate(_hoverDate);
            return this.compared(this._date, this._hoverDate) === -1;
        });
    }

    @HostBinding('class.max')
    get classMax_() {
        return mu.run(this._rst._maxDate, (_maxDate) => {
            this._hoverDate = this.mndate(_maxDate);
            return this.compared(this._date, this._maxDate) === 1;
        });
    }

    @HostBinding('class.min')
    get classMin_() {
        return mu.run(this._rst._hoverDate, (_minDate) => {
            this._minDate = this.mndate(_minDate);
            return this.compared(this._date, this._minDate) === -1;
        });
    }

    _hoverDate: any;
    _startDate: any;
    _endDate: any;
    _maxDate: any;
    _minDate: any;

    _rst: any = {};

    constructor(private _mds: MnDatetimeServices) {
        _mds.date$.subscribe((rst: any = {}) => {

            this._rst = rst;

            // this._hoverDate = rst._hoverDate;
            // this._startDate = rst._startDate;
            // this._endDate = rst._endDate;
            // this._maxDate = rst._maxDate;
            // this._minDate = rst._minDate;
        });
    }

    ngOnInit() {

        setTimeout(() => {
            this._mds.setDate({
                _startDate: '2017-09-08'
            });
        }, 10000);

    }

    /**
     * 根据当前视图比较两个时间
     * @param src
     * @param target
     *
     * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
     */
    compared(src, target): number {
        let _src = src[this._view];
        let _target = target[this._view];
        if (_src.start > _target.end) {
            return -1;
        } else if (_src.end < _target.start) {
            return 1;
        } else if (_src.start === _target.start && _src.end === _target.end) {
            return 0;
        } else if (_src.start < _target.start && _target.end < _src.end) {
            return 2;
        } else {
            return -2;
        }
    }

    mndate(date): any {
        return new MnDate(date);
    }
}
