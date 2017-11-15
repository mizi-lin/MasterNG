"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var mn_datetime_services_1 = require("./mn-datetime.services");
var MnMonthsPickerComponent = (function () {
    function MnMonthsPickerComponent(_mds) {
        this._mds = _mds;
        this.result = new core_1.EventEmitter();
        this.current = new mn_date_class_1.MnDate(new Date());
        this.calendar = [];
        this._tenshow = {};
    }
    Object.defineProperty(MnMonthsPickerComponent.prototype, "_maxDate", {
        set: function (value) {
            if (value) {
                this.maxDate = new mn_date_class_1.MnDate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnMonthsPickerComponent.prototype, "_minDate", {
        set: function (value) {
            if (value) {
                this.minDate = new mn_date_class_1.MnDate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnMonthsPickerComponent.prototype, "_startDate", {
        set: function (value) {
            if (value) {
                var startDate = new mn_date_class_1.MnDate(value);
                this.startDate = this._mds.reStartDate(startDate, this.maxDate, this.minDate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnMonthsPickerComponent.prototype, "_endDate", {
        set: function (value) {
            if (!value) {
                return;
            }
            if (!this.startDate) {
                console.warn('startDate and endDate must exist at the same time');
            }
            var endDate = new mn_date_class_1.MnDate(value);
            this.endDate = this._mds.reEndDate(endDate, this.maxDate, this.minDate);
            this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnMonthsPickerComponent.prototype, "_date", {
        set: function (value) {
            if (this.startDate || this.endDate) {
                console.warn('startDate or endDate can not exist with the date');
            }
            var date = new mn_date_class_1.MnDate(value);
            this.startDate = new mn_date_class_1.MnDate(date.months.start);
            this.endDate = new mn_date_class_1.MnDate(date.months.end);
            this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));
        },
        enumerable: true,
        configurable: true
    });
    MnMonthsPickerComponent.prototype.ngOnInit = function () {
        // 设置startDate, endDate 默认值
        if (!(mu.isNotEmpty(this.endDate) && mu.isNotEmpty(this.startDate))) {
            this.startDate = new mn_date_class_1.MnDate(this.current.months.start);
            this.endDate = new mn_date_class_1.MnDate(this.current.months.end);
        }
        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.minDate)) {
            var minDate = this.startDate.yoy(-3);
            this.minDate = new mn_date_class_1.MnDate(minDate.start);
        }
        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.maxDate)) {
            var maxDate = this.endDate.yoy(1);
            this.maxDate = new mn_date_class_1.MnDate(maxDate.start);
        }
        var _start_years = this.minDate.months.year;
        var _end_years = this.maxDate.months.year;
        for (var i = _start_years; i <= _end_years; i++) {
            this.calendar.unshift({
                year: i,
                months: this.getMonthsByYear(i)
            });
        }
    };
    MnMonthsPickerComponent.prototype.getMonthsByYear = function (year) {
        var _this = this;
        return mu.map(12, function (i, index) {
            var _year_month = year + '-' + mu.leftpad(13 - i, 2);
            var _mndate = new mn_date_class_1.MnDate(_year_month);
            _mndate.show = true;
            if (_this.minDate) {
                _mndate.show = _mndate.months.start > _this.minDate._ts;
            }
            if (_this.maxDate && _mndate.show) {
                _mndate.show = _mndate.months.end < _this.maxDate._ts;
            }
            return _mndate;
        }, []);
    };
    MnMonthsPickerComponent.prototype.selected = function (date) {
        var _this = this;
        if (!date.show) {
            return;
        }
        mu.run(this.startDate, function () {
            mu.run(_this.endDate, function () {
                _this.startDate = date;
                _this.endDate = void 0;
            }, function () {
                if (date.months.start < _this.startDate.months.end) {
                    _this.endDate = _this.startDate;
                    _this.startDate = date;
                }
                else {
                    _this.endDate = date;
                }
            });
        }, function () {
            _this.startDate = date;
        });
        this.result.emit(this.backStartEnd(this.startDate, this.endDate, false));
    };
    MnMonthsPickerComponent.prototype.hovered = function (date) {
        this._hoverDate = date;
    };
    MnMonthsPickerComponent.prototype.started = function (date) {
        var _this = this;
        return mu.run(this.startDate, function () {
            return date.show && date.months.start === mu.prop(_this.startDate, 'months.start');
        });
    };
    MnMonthsPickerComponent.prototype.ended = function (date) {
        var _this = this;
        return mu.run(this.endDate, function () {
            return date.show && date.months.start === mu.prop(_this.endDate, 'months.start');
        });
    };
    /**
     * 判断时间区间
     * @param date
     */
    MnMonthsPickerComponent.prototype.ranged = function (date) {
        var endDate = mu.ifempty(this.endDate, this._hoverDate);
        if (this.startDate && endDate) {
            return date.show && this.startDate.months.end < date.months.start && date.months.start < endDate.months.end;
        }
    };
    /**
     * 反向日期显示
     * @param date
     * @return {boolean}
     */
    MnMonthsPickerComponent.prototype.reverseRanged = function (date) {
        if (this.startDate && this._hoverDate && !this.endDate) {
            return date.show && this.startDate.months.end > date.months.start && date.months.end > this._hoverDate.months.start;
        }
    };
    MnMonthsPickerComponent.prototype.backStartEnd = function (_startDate, _endDate, first) {
        // let startDate = _startDate.months.start;
        // // _endDate = _endDate || _startDate;
        // // let endDate = _endDate.years.end;
        //
        // let endDate = _endDate ? new MnDate(_endDate.months.end) : void 0;
        var endDate = mu.run(_endDate, function (_end) {
            var end = _end.clone();
            return new mn_date_class_1.MnDate(end.months.end);
        });
        return {
            startDate: _startDate,
            endDate: endDate,
            first: first,
        };
    };
    return MnMonthsPickerComponent;
}());
MnMonthsPickerComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-monthspicker',
                template: "\n        <ng-container *ngFor=\"let year of calendar\">\n            <mn-fill [gutter]=\"2\">\n                <ng-container *ngFor=\"let month of year.months\">\n                    <mn-col [span]=\"2\"\n                            [class.no-selected]=\"!month.show\"\n                            [class.start]=\"started(month)\"\n                            [class.end]=\"ended(month)\"\n                            [class.range]=\"ranged(month)\"\n                            [class.range-reverse]=\"reverseRanged(month)\"\n                            (mouseover)=\"hovered(month)\"\n                            (click)=\"selected(month)\">\n                        <div class=\"mnc-monthspicker-month\">{{month.months.month | mu:'leftpad':2}}</div>\n                        <div class=\"mnc-monthspicker-year\">{{month.months.year}}</div>\n                    </mn-col>\n                </ng-container>\n            </mn-fill>\n        </ng-container>\n    "
            },] },
];
/** @nocollapse */
MnMonthsPickerComponent.ctorParameters = function () { return [
    { type: mn_datetime_services_1.MnDatetimeServices, },
]; };
MnMonthsPickerComponent.propDecorators = {
    '_maxDate': [{ type: core_1.Input, args: ['mnMaxDate',] },],
    '_minDate': [{ type: core_1.Input, args: ['mnMinDate',] },],
    '_startDate': [{ type: core_1.Input, args: ['mnStartDate',] },],
    '_endDate': [{ type: core_1.Input, args: ['mnEndDate',] },],
    '_date': [{ type: core_1.Input, args: ['mnDate',] },],
    'result': [{ type: core_1.Output, args: ['mnResult',] },],
};
exports.MnMonthsPickerComponent = MnMonthsPickerComponent;
//# sourceMappingURL=mn-months-picker.component.js.map