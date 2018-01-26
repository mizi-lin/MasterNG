import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datemultiple',
    template: `
        <mn-fill [gutter]="16">
            <mn-col [span]="1">
                <mn-datecalendar
                        [mnMinDate]="_minDate"
                        [mnMaxDate]="_maxDate"
                        [mnStartDate]="_startDate"
                        [mnEndDate]="_endDate"
                        [mnHoverDate]="_hoverDate"
                        [mnView]="_view"

                        [mnYear]="_prev?.days?.year"
                        [mnMonth]="_prev?.days?.month"

                        [mnNextDate]="_next"

                        [mnDisabled]="_disabled$ || _disabled"

                        (mnResult)="getPreCalendar($event)"
                        (mnStartEnd)="getStartEnd($event)"
                        (mnHover)="_hoverDate = $event"></mn-datecalendar>
            </mn-col>

            <mn-col [span]="1">
                <mn-datecalendar
                        [mnMinDate]="_minDate"
                        [mnMaxDate]="_maxDate"
                        [mnStartDate]="_startDate"
                        [mnEndDate]="_endDate"
                        [mnHoverDate]="_hoverDate"
                        [mnView]="_view"

                        [mnYear]="_next?.days?.year"
                        [mnMonth]="_next?.days?.month"

                        [mnPrevDate]="_prev"

                        [mnDisabled]="_disabled$ || _disabled"

                        (mnResult)="getNextCalendar($event)"
                        (mnStartEnd)="getStartEnd($event)"
                        (mnHover)="_hoverDate = $event"></mn-datecalendar>
            </mn-col>

        </mn-fill>
    `
})
export class MnDateMultipleComponent implements OnInit {

    date$ = new BehaviorSubject<any>({});

    date$_: any = {};

    _maxDate: any;

    @Input('mnMaxDate')
    set maxDate_(dt) {
        let _maxDate = new MnDate(dt);
        mu.run(_maxDate, () => {
            this.date$_ = {
                ...this.date$_,
                _maxDate
            };
            this._maxDate = _maxDate;
            this.date$.next(this.date$_);
        });
    }

    _minDate: any;

    @Input('mnMinDate')
    set minDate_(dt) {
        let _minDate = new MnDate(dt);
        mu.run(_minDate, () => {
            this.date$_ = {
                ...this.date$_,
                _minDate
            };
            this._minDate = _minDate;
            this.date$.next(this.date$_);
        });
    }

    _startDate: any;

    @Input('mnStartDate')
    set startDate_(dt) {
        let _startDate = new MnDate(dt);
        this.date$_ = {
            ...this.date$_,
            _startDate
        };
        this.date$.next(this.date$_);
    }

    _endDate: any;

    @Input('mnEndDate')
    set endDate_(dt) {
        let _endDate = new MnDate(dt);
        this.date$_ = {
            ...this.date$_,
            _endDate
        };
        this.date$.next(this.date$_);
    }

    @Input('mnView') _view: string = 'days';

    _disabled: boolean = false;

    // 手动配置 disabled 时，权重最大
    @Input('mnDisabled') _disabled$: boolean = false;

    @Output('mnResult') _result = new EventEmitter<any>();
    @Output('mnSelected') _selected = new EventEmitter<any>();

    _hoverDate: any;

    _prev: any = {};
    _next: any = {};

    constructor() {

    }

    ngOnInit() {
        this.date$.subscribe(dates => this.calculation(dates));
    }

    calculation = mu.debounce((dates) => {
        let {_minDate = <any>{}, _maxDate = <any>{}, _startDate = <any>{}, _endDate = <any>{}} = dates;

        console.debug(
            '~~ minDate :::', _minDate['_d']);
        console.debug(
            '~~ maxDate :::', _maxDate['_d']);
        console.debug(
            '~~ startDate :::', _startDate['_d']);
        console.debug(
            '~~ endDate :::', _endDate['_d']);

        _minDate = mu.ifempty(_minDate, new MnDate('100-01-01'));
        _maxDate = mu.ifempty(_maxDate, new MnDate('9999-12-12'));

        /**
         * 时间异常
         *
         *  _minDate === _maxDate
         *  _startDate > _endDate
         *  _minDate > _maxDate
         *  _minDate > _endDate
         *  _startDate > _maxDate
         */
        if (_minDate._ts === _maxDate._ts) {
            this._disabled = true;
            console.error('exception :::: ', 'minDate equal maxDate');
            this._result.emit({
                disable: true
            });
            return;
        }

        if (_minDate._ts > _maxDate._ts) {
            this._disabled = true;
            console.error('exception :::: ', 'minDate greater than maxDate');
            this._result.emit({
                disable: true
            });
            return;
        }

        // 若开始结束时间不存在
        if (mu.isEmpty(_startDate) && mu.isEmpty(_endDate)) {
            this._disabled = false;
            this._result.emit({
                maxDate: this._maxDate,
                minDate: this._minDate,
                disable: false
            });
            this.getViewInfo();
            return;
        }

        if (mu.isNotEmpty(_endDate) && _minDate._ts > _endDate._ts) {
            this._disabled = true;
            this._result.emit({
                disabled: true
            });
            console.error('exception :::: ', 'minDate greater than endDate');
            return;
        }

        if (mu.isNotEmpty(_startDate) && _startDate._ts > _maxDate._ts) {
            this._disabled = true;
            this._result.emit({
                disabled: true
            });
            console.error('exception :::: ', 'startDate greater than maxDate');
            return;
        }

        if (mu.isNotEmpty(_startDate) && mu.isNotEmpty(_endDate) && _startDate._ts > _endDate._ts) {
            this._disabled = true;
            this._result.emit({
                disabled: true
            });
            console.error('exception :::: ', 'startDate greater than endDate');
            return;
        }

        /**
         * 时间区间重新计算
         *
         * 1. _startDate < _minDate < _endDate
         * // => _startDate = _minDate
         *
         * 2. _startDate < _maxDate < _endDate
         * // => _endDate = _maxDate
         */
        if (mu.isNotEmpty(_startDate) && _startDate._ts < _minDate._ts) {
            _startDate = _minDate.clone();
            console.warn('warning :::: ', 'startDate less than endDate');
        }

        if (mu.isNotEmpty(_endDate) && _maxDate._ts < _endDate._ts) {
            _endDate = _maxDate.clone();
            console.warn('warning :::: ', 'maxDate less than endDate');
        }

        this._disabled = false;
        this._startDate = _startDate;
        this._endDate = _endDate;

        this._result.emit({
            disabled: false,
            startDate: this._startDate,
            endDate: this._endDate,
            maxDate: this._maxDate,
            minDate: this._minDate,
        });

        /**
         * 获取两个视图信息
         */

        this.getViewInfo();

    }, 300);

    /**
     * 获取两个视图信息
     */
    getViewInfo() {
        let {_startDate, _endDate, _maxDate, _minDate} = this;

        /**
         * 没有设置初始时间，则默认视图显示当前时间
         */

        if (mu.isEmpty(_startDate) && mu.isEmpty(_endDate)) {

            if (mu.isNotEmpty(_maxDate)) {
                this._next = _maxDate.clone();
                this._prev = new MnDate(this._next.mom(-1).start);
                return;
            } else if (mu.isNotEmpty(_minDate)) {
                this._prev = _minDate.clone();
                this._next = new MnDate(this._prev.mom(1).start);
                return;
            } else {
                this._prev = new MnDate(new Date());
                this._next = new MnDate(this._prev.mom(1).start);
                return;
            }

        }

        if (mu.isEmpty(_startDate) && mu.isNotEmpty(_endDate)) {
            this._prev = _endDate.clone();
            this._next = new MnDate(this._prev.mom(1).start);
            return;
        }

        if (mu.isNotEmpty(_startDate)) {
            this._prev = _startDate.clone();
            this._next = new MnDate(this._prev.mom(1).start);
            if (
                mu.prop(_startDate, 'months.start') === mu.prop(_endDate, 'months.start')
                || mu.isEmpty(_endDate)) {
                this._next = new MnDate(this._prev.mom(1).start);
            } else {
                this._next = _endDate.clone();
            }
        }

    }

    getPreCalendar(prev) {
        this._prev = prev;
    }

    getNextCalendar(next) {
        this._next = next;
    }

    getStartEnd($event) {
        this.getStartEnd_($event);
    }

    getStartEnd_ = mu.debounce((ds) => {
        this._startDate = ds.startDate;
        this._endDate = ds.endDate;

        if (mu.isNotEmpty(this._endDate)) {
            this._selected.emit(ds);
        }
    }, 100);

}

