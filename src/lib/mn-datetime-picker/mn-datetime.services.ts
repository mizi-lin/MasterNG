import {Injectable} from '@angular/core';
import {max} from 'rxjs/operator/max';
import {count} from 'rxjs/operator/count';
import {MnDate} from './mn-date.class';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import  mu from 'mzmu';

@Injectable()
export class MnDatetimeServices {

    constructor() {
    }

    date$ = new BehaviorSubject<any>({});

    setDate(value) {
        this.date$.next(value);
    }

    getRangeDate(rule: string) {
        let mndate = new MnDate(new Date());

        let _range_map = {
            y: 'year_range',
            M: 'month_range',
            d: 'range',
            w: 'week_range',
            q: 'quarter_range'
        };

        let _rule = (rule): any[] => {
            let regx = /(([-+]|)\d{1,})([:]|)([yMdhmsSqw])$/i;
            let rst = (rule || '').match(regx);
            return [rst[1], rst[4], rst[3]];
        };

        let _getRangeDate = (diff: string | number, type: string, begin?: boolean) => {
            diff = parseInt((diff + ''), 10);
            let _map = {
                y: 'yoy',
                M: 'mom',
                d: 'dod',
                h: 'sos',
                m: 'sos',
                s: 'sos',
                S: 'sos',
                q: 'qoq',
                w: 'wow',
            };

            // todo mom -> mm

            return mndate[_map[type]](diff, begin);
        };

        // if (mu.isNotExist(rule)) {
        //     return;
        // }

        let [_r1, _r2] = rule.split(',');
        let _start, _end;
        let _endType;

        mu.run(mu.trim(_r1 || ''), (_r1) => {
            let _rst = _rule(_r1) || [];
            let [_diff, _type, _begin] = _rst;
            _endType = !!_begin;
            _start = _getRangeDate(_diff, _type, _endType);
        });

        _end = mu.run(mu.trim(_r2 || ''), (_r2) => {
            let _rst = _rule(_r2) || [];
            let [_diff, _type, _begin] = _rst;

            _end = _getRangeDate(_diff, _type, _begin);

            if (_begin) {
                _end = _start[_range_map[_type]].end;
                // _start = _start[_range_map[_type]].start;
            }
        });

        if (!_end) {
            if (_endType) {
                // todo 计算获得结束时间

            } else {
                _end = mndate;
            }

        }

        let rst = [_start, _end].sort((a, b) => {
            return a.days.start > b.days.start ? 1 : -1;
        });

        return {
            startDate: rst[0],
            endDate: rst[1],
        };
    }

    reStartDate(startDate, maxDate, minDate) {
        if (mu.isEmpty(startDate)) {
            return startDate;
        }

        if (maxDate || minDate) {
            if (minDate && (startDate.days.start < minDate.days.start)) {
                startDate = minDate;
            }

            if (maxDate && (startDate.days.start > maxDate.days.start)) {
                startDate = void 0;
            }
        }
        return startDate;
    }

    reEndDate(endDate, maxDate, minDate) {
        if (mu.isEmpty(endDate)) {
            return endDate;
        }

        if (maxDate || minDate) {
            if (maxDate && endDate.days.start > maxDate.days.start) {
                endDate = maxDate;
            }

            if (minDate && minDate.days.start > endDate.days.start) {
                endDate = void 0;
            }
        }

        return endDate;
    }

    /**
     * 获得当前时间的视图数据
     * @param _date
     * @param {string} view
     */
    getCalendar(_date: any, view: string) {
        let _views;
        switch (view) {
            case 'days':
                return this.getCalendarWithDays(_date);
            case 'weeks':
                return this.getCalendarWithWeeks(_date);
            case 'months':
                return this.getCalendarWithMonths(_date);
            case 'quarters':
                return this.getCalendarWithQuarters(_date);
            case 'years':
                return this.getCalendarWithYears(_date);
        }
    }

    private getCalendarWithDays(_date: any) {
        _date = new MnDate(_date);
        let _cds = mu.map(6, (i) => {
            return new Array(7);
        }, []);
    }

    private getCalendarWithWeeks(_date: any) {

    }

    private getCalendarWithMonths(_date: any) {

    }

    private getCalendarWithQuarters(_date: any) {

    }

    private getCalendarWithYears(_date: any) {

    }

    /**
     * v2
     */
    /**
     * 根据当前视图比较两个时间
     * @param view
     * @param src
     * @param target
     *
     * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
     */
    compared(view, src, target): number {
        if (mu.isEmpty(src) || mu.isEmpty(target)) {
            return;
        }

        src = new MnDate(src);
        target = new MnDate(target);

        let _src = src[view];
        let _target = target[view];
        if (_src.start > _target.end) {
            return 1;
        } else if (_src.end < _target.start) {
            return -1;
        } else if (_src.start === _target.start && _src.end === _target.end) {
            return 0;
        } else if (_src.start < _target.start && _target.end < _src.end) {
            return 2;
        } else {
            return -2;
        }
    }

    /**
     * 判断当前时间是否在时间范围之内
     * @param view
     * @param src
     * @param min
     * @param max
     * @return {number} 2 范围内，0 小于最小值， 1 大于最大值
     */
    range(view, src, min, max): number {
        if (mu.isEmpty(src)) {
            return;
        }

        if (mu.isEmpty(min)) {
            min = new MnDate('1/1/1');
        }

        if (mu.isEmpty(max)) {
            min = new MnDate('9999/1/1');
        }

        let _src = src[view];
        let _min = min[view];
        let _max = max[view];

        if (_min.start <= _src.start && _src.end <= _max.end) {
            return 2;
        } else if (_min.end > _src.star) {
            return 0;
        } else if (_src.end > _max.start) {
            return 1;
        }
    }

}
